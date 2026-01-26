import { ReactNode, ReactElement, Children, isValidElement } from 'react';
import { TableProperty } from './NestedTableContext';
import { Table as BaseTable } from '../Table';

/**
 * Pattern for auto-detecting type references in table cells.
 * Matches PascalCase identifiers ending in common type suffixes.
 * Examples: RoomOptions, PresenceConfig, MessageData, StatusEnum
 */
const TYPE_REFERENCE_PATTERN = /^[A-Z][a-zA-Z0-9]*(Options|Config|Settings|Data|Info|Params|Type|Enum)$/;

/**
 * Pattern for explicit table reference syntax in markdown cells.
 * Matches: <Table id='TypeName'/> or <Table id="TypeName"/>
 */
const EXPLICIT_TABLE_REFERENCE_PATTERN = /<Table\s+id=["']([^"']+)["']\s*\/?>/i;

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
 * Finds a Table element in children and returns its id prop
 */
function findTableElementId(children: ReactNode): string | undefined {
  if (!children) {
    return undefined;
  }

  if (Array.isArray(children)) {
    for (const child of children) {
      const result = findTableElementId(child);
      if (result) {
        return result;
      }
    }
    return undefined;
  }

  if (isValidElement(children)) {
    const element = children as ReactElement<{ id?: string; children?: ReactNode }>;
    const typeName = getTypeName(element);

    // Check if this is a Table element with an id
    if ((typeName === 'Table' || typeName === 'NestedTable') && element.props.id) {
      return element.props.id;
    }

    // Recurse into children
    return findTableElementId(element.props.children);
  }

  return undefined;
}

/**
 * Checks if a type cell contains a Table reference.
 * Supports two syntaxes:
 * 1. Explicit: <Table id='TypeName'/> or <Table id="TypeName"/>
 * 2. Implicit: PascalCase names ending in recognized suffixes (see TYPE_REFERENCE_PATTERN)
 */
function extractTableReference(typeText: string): string | undefined {
  const trimmed = typeText.trim();

  // Check for explicit <Table id='X'/> syntax (rendered as text in markdown cells)
  const explicitMatch = trimmed.match(EXPLICIT_TABLE_REFERENCE_PATTERN);
  if (explicitMatch) {
    return explicitMatch[1];
  }

  // Check for implicit type name reference
  if (TYPE_REFERENCE_PATTERN.test(trimmed)) {
    return trimmed;
  }

  return undefined;
}

/**
 * Extracts type information from a table cell's children.
 * Returns both the ReactNode for display and any detected type reference.
 */
function extractTypeInfo(cellChildren: ReactNode): { type: ReactNode; typeReference: string | undefined } {
  const typeText = extractText(cellChildren).trim();
  const tableElementId = findTableElementId(cellChildren);
  const typeReference = tableElementId || extractTableReference(typeText);
  return { type: cellChildren, typeReference };
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
      const { type, typeReference } = extractTypeInfo(typeCell?.props?.children);

      properties.push({
        name: name.trim(),
        required: requiredText.includes('required') ? 'required' : 'optional',
        description,
        type,
        typeReference,
      });
    } else if (cells.length === 3) {
      // 3 columns: Name | Description | Type
      const nameCell = cells[0] as ReactElement<{ children?: ReactNode }>;
      const descriptionCell = cells[1] as ReactElement<{ children?: ReactNode }>;
      const typeCell = cells[2] as ReactElement<{ children?: ReactNode }>;

      const name = extractText(nameCell?.props?.children);
      const description = descriptionCell?.props?.children;
      const { type, typeReference } = extractTypeInfo(typeCell?.props?.children);

      properties.push({
        name: name.trim(),
        description,
        type,
        typeReference,
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
      });
    }
  });

  return properties;
}
