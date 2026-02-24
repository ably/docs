import { ReactNode, ReactElement, Children, isValidElement, cloneElement } from 'react';
import { TableProperty } from './NestedTableContext';
import { Table as BaseTable } from '../Table';

/**
 * Pattern for auto-detecting type references in table cells.
 * Matches PascalCase identifiers ending in common type suffixes.
 * Examples: RoomOptions, PresenceConfig, MessageData, StatusEnum
 */
const TYPE_REFERENCE_PATTERN = /^[A-Z][a-zA-Z0-9]*(Options|Config|Settings|Data|Info|Params|Type|Enum)$/;

/**
 * Extracts text content from React children recursively
 */
function extractText(children: ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(extractText).join('');
  }
  if (isValidElement(children)) {
    const element = children as ReactElement<{ children?: ReactNode }>;
    return extractText(element.props.children);
  }
  return '';
}

/**
 * Gets the type name for a React element or string
 */
function getTypeName(element: ReactElement): string {
  const type = element.type;
  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'function') {
    return (type as { displayName?: string }).displayName || (type as { name?: string }).name || '';
  }
  return '';
}

/**
 * Finds all Table elements in children and returns their id props
 */
function findAllTableElementIds(children: ReactNode): string[] {
  const ids: string[] = [];

  if (!children) {
    return ids;
  }

  if (Array.isArray(children)) {
    for (const child of children) {
      ids.push(...findAllTableElementIds(child));
    }
    return ids;
  }

  if (isValidElement(children)) {
    const element = children as ReactElement<{ id?: string; children?: ReactNode }>;
    const typeName = getTypeName(element);

    // Check if this is a Table element with an id
    if ((typeName === 'Table' || typeName === 'NestedTable') && element.props.id) {
      ids.push(element.props.id);
    }

    // Recurse into children
    ids.push(...findAllTableElementIds(element.props.children));
  }

  return ids;
}

/**
 * Finds all Table references in type text.
 * Supports two syntaxes:
 * 1. Explicit: <Table id='TypeName'/> or <Table id="TypeName"/> (may appear multiple times)
 * 2. Implicit: PascalCase names ending in recognized suffixes (only when entire text is one type name)
 */
function extractAllTableReferences(typeText: string): string[] {
  const trimmed = typeText.trim();

  // Check for explicit <Table id='X'/> syntax (may appear multiple times)
  const matches = [...trimmed.matchAll(/<Table\s+id=["']([^"']+)["']\s*\/?>/gi)];
  if (matches.length > 0) {
    return matches.map((m) => m[1]);
  }

  // Fallback: implicit type name reference (only when the entire text is one type name)
  if (TYPE_REFERENCE_PATTERN.test(trimmed)) {
    return [trimmed];
  }

  return [];
}

/**
 * Walks React children and replaces Table/NestedTable elements with their ID as plain text.
 * Produces a clean display like "PresenceData or String" from mixed React children.
 */
function buildTypeDisplay(children: ReactNode): ReactNode {
  if (!children) {
    return children;
  }

  if (typeof children === 'string' || typeof children === 'number') {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map((child, i) => {
      const result = buildTypeDisplay(child);
      if (isValidElement(result)) {
        return cloneElement(result, { key: i });
      }
      return result;
    });
  }

  if (isValidElement(children)) {
    const element = children as ReactElement<{ id?: string; children?: ReactNode }>;
    const typeName = getTypeName(element);

    // Replace Table/NestedTable elements with their ID as plain text
    if ((typeName === 'Table' || typeName === 'NestedTable') && element.props.id) {
      return element.props.id;
    }

    // For other elements, recurse into their children
    if (element.props.children) {
      const newChildren = buildTypeDisplay(element.props.children);
      return cloneElement(element, {}, newChildren);
    }
  }

  return children;
}

/**
 * Extracts type information from a table cell's children.
 * Returns the ReactNode for display, all detected type references, and a cleaned-up display.
 */
function extractTypeInfo(cellChildren: ReactNode): {
  type: ReactNode;
  typeReferences: string[];
  typeDisplay: ReactNode | undefined;
} {
  const typeText = extractText(cellChildren).trim();
  const elementIds = findAllTableElementIds(cellChildren);
  const typeReferences = elementIds.length > 0 ? elementIds : extractAllTableReferences(typeText);

  // Build a cleaned-up display if there are references that need replacing
  const typeDisplay = typeReferences.length > 0 ? buildTypeDisplay(cellChildren) : undefined;

  return { type: cellChildren, typeReferences, typeDisplay };
}

/**
 * Checks if an element is a table body (tbody or custom TableBody)
 */
function isTableBody(element: ReactElement): boolean {
  const type = element.type;
  return type === 'tbody' || type === BaseTable.Body;
}

/**
 * Checks if an element is a table row (tr or custom TableRow)
 */
function isTableRow(element: ReactElement): boolean {
  const type = element.type;
  return type === 'tr' || type === BaseTable.Row;
}

/**
 * Checks if an element is a table cell (td or custom TableCell)
 */
function isTableCell(element: ReactElement): boolean {
  const type = element.type;
  return type === 'td' || type === BaseTable.Cell;
}

/**
 * Recursively finds all elements matching a predicate
 */
function findElements(children: ReactNode, predicate: (element: ReactElement) => boolean): ReactElement[] {
  const results: ReactElement[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    if (predicate(child)) {
      results.push(child);
    }

    // Recurse into children
    const element = child as ReactElement<{ children?: ReactNode }>;
    if (element.props.children) {
      results.push(...findElements(element.props.children, predicate));
    }
  });

  return results;
}

/**
 * Parses MDX table children into structured TableProperty array.
 * Supports flexible column counts:
 * - 2 columns: Name | Description
 * - 3 columns: Name | Description | Type
 * - 4 columns: Name | Required | Description | Type
 */
export function parseTableChildren(children: ReactNode): TableProperty[] {
  const properties: TableProperty[] = [];

  // Find all table body elements
  const bodies = findElements(children, isTableBody);

  // If no tbody found, try finding rows directly
  let rows: ReactElement[] = [];
  if (bodies.length > 0) {
    bodies.forEach((body) => {
      const bodyRows = findElements((body as ReactElement<{ children?: ReactNode }>).props.children, isTableRow);
      rows.push(...bodyRows);
    });
  } else {
    // Try finding rows directly in children
    rows = findElements(children, isTableRow);
  }

  // Process each row
  rows.forEach((row) => {
    const rowElement = row as ReactElement<{ children?: ReactNode }>;
    const cells = Children.toArray(rowElement.props.children).filter(
      (child): child is ReactElement => isValidElement(child) && isTableCell(child as ReactElement),
    );

    if (cells.length >= 4) {
      // 4 columns: Name | Required | Description | Type
      const nameCell = cells[0] as ReactElement<{ children?: ReactNode }>;
      const requiredCell = cells[1] as ReactElement<{ children?: ReactNode }>;
      const descriptionCell = cells[2] as ReactElement<{ children?: ReactNode }>;
      const typeCell = cells[3] as ReactElement<{ children?: ReactNode }>;

      const name = extractText(nameCell?.props?.children);
      const requiredText = extractText(requiredCell?.props?.children).toLowerCase();
      const description = descriptionCell?.props?.children;
      const { type, typeReferences, typeDisplay } = extractTypeInfo(typeCell?.props?.children);

      properties.push({
        name: name.trim(),
        required: requiredText.includes('required') ? 'required' : 'optional',
        description,
        type,
        typeReferences,
        typeDisplay,
      });
    } else if (cells.length === 3) {
      // 3 columns: Name | Description | Type
      const nameCell = cells[0] as ReactElement<{ children?: ReactNode }>;
      const descriptionCell = cells[1] as ReactElement<{ children?: ReactNode }>;
      const typeCell = cells[2] as ReactElement<{ children?: ReactNode }>;

      const name = extractText(nameCell?.props?.children);
      const description = descriptionCell?.props?.children;
      const { type, typeReferences, typeDisplay } = extractTypeInfo(typeCell?.props?.children);

      properties.push({
        name: name.trim(),
        description,
        type,
        typeReferences,
        typeDisplay,
      });
    } else if (cells.length === 2) {
      // 2 columns: Name | Description
      const nameCell = cells[0] as ReactElement<{ children?: ReactNode }>;
      const descriptionCell = cells[1] as ReactElement<{ children?: ReactNode }>;

      const name = extractText(nameCell?.props?.children);
      const description = descriptionCell?.props?.children;

      properties.push({
        name: name.trim(),
        description,
        typeReferences: [],
      });
    }
  });

  return properties;
}
