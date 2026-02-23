import React, { createElement } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { parseTableChildren } from './parseTable';
import { NestedTablePropertyRow } from './NestedTablePropertyRow';
import { NestedTableProvider, TableProperty, useNestedTable } from './NestedTableContext';

/**
 * Mock component that simulates what MDX produces for <Table id='X'/>.
 * getTypeName() checks displayName, which must be 'Table' or 'NestedTable'.
 */
const TableRef: React.FC<{ id?: string }> = () => null;
TableRef.displayName = 'NestedTable';

/**
 * Builds a <table> element tree matching what MDX markdown tables produce.
 * Each inner array is a row of cell contents.
 */
function buildTableElement(rows: React.ReactNode[][]) {
  const colCount = rows[0]?.length ?? 0;
  return createElement(
    'table',
    null,
    createElement(
      'thead',
      null,
      createElement(
        'tr',
        null,
        Array.from({ length: colCount }, (_, i) => createElement('th', { key: i }, `Header ${i}`)),
      ),
    ),
    createElement(
      'tbody',
      null,
      rows.map((cells, rowIdx) =>
        createElement(
          'tr',
          { key: rowIdx },
          cells.map((cell, cellIdx) => createElement('td', { key: cellIdx }, cell)),
        ),
      ),
    ),
  );
}

describe('parseTableChildren', () => {
  describe('type reference extraction', () => {
    it('extracts no references from plain text types', () => {
      const table = buildTableElement([['name', 'Required', 'A description', 'String']]);
      const result = parseTableChildren(table);

      expect(result).toHaveLength(1);
      expect(result[0].typeReferences).toEqual([]);
      expect(result[0].typeDisplay).toBeUndefined();
    });

    it('extracts a single Table element reference', () => {
      const table = buildTableElement([
        ['name', 'Required', 'A description', createElement(TableRef, { id: 'PresenceData' })],
      ]);
      const result = parseTableChildren(table);

      expect(result).toHaveLength(1);
      expect(result[0].typeReferences).toEqual(['PresenceData']);
    });

    it('extracts a single reference alongside plain text', () => {
      const typeCell = [createElement(TableRef, { id: 'PresenceData', key: 'ref' }), ' or String'];
      const table = buildTableElement([['name', 'Required', 'A description', typeCell]]);
      const result = parseTableChildren(table);

      expect(result).toHaveLength(1);
      expect(result[0].typeReferences).toEqual(['PresenceData']);
    });

    it('extracts two Table element references', () => {
      const typeCell = [
        createElement(TableRef, { id: 'TypeA', key: 'a' }),
        ' or ',
        createElement(TableRef, { id: 'TypeB', key: 'b' }),
      ];
      const table = buildTableElement([['name', 'Required', 'A description', typeCell]]);
      const result = parseTableChildren(table);

      expect(result).toHaveLength(1);
      expect(result[0].typeReferences).toEqual(['TypeA', 'TypeB']);
    });

    it('extracts three Table element references', () => {
      const typeCell = [
        createElement(TableRef, { id: 'TypeA', key: 'a' }),
        ' or ',
        createElement(TableRef, { id: 'TypeB', key: 'b' }),
        ' or ',
        createElement(TableRef, { id: 'TypeC', key: 'c' }),
      ];
      const table = buildTableElement([['name', 'Required', 'A description', typeCell]]);
      const result = parseTableChildren(table);

      expect(result).toHaveLength(1);
      expect(result[0].typeReferences).toEqual(['TypeA', 'TypeB', 'TypeC']);
    });

    it('extracts an implicit PascalCase reference when it is the sole type', () => {
      const table = buildTableElement([['name', 'A description', 'RoomOptions']]);
      const result = parseTableChildren(table);

      expect(result).toHaveLength(1);
      expect(result[0].typeReferences).toEqual(['RoomOptions']);
    });

    it('does not extract implicit references from non-matching text', () => {
      const table = buildTableElement([['name', 'A description', 'string']]);
      const result = parseTableChildren(table);

      expect(result).toHaveLength(1);
      expect(result[0].typeReferences).toEqual([]);
    });

    it('sets empty typeReferences for 2-column tables', () => {
      const table = buildTableElement([['name', 'A description']]);
      const result = parseTableChildren(table);

      expect(result).toHaveLength(1);
      expect(result[0].typeReferences).toEqual([]);
      expect(result[0].type).toBeUndefined();
    });
  });

  describe('typeDisplay', () => {
    it('is undefined when there are no references', () => {
      const table = buildTableElement([['name', 'Required', 'A description', 'String']]);
      const result = parseTableChildren(table);

      expect(result[0].typeDisplay).toBeUndefined();
    });

    it('is the ID string for a single Table reference', () => {
      const table = buildTableElement([
        ['name', 'Required', 'A description', createElement(TableRef, { id: 'TypeA' })],
      ]);
      const result = parseTableChildren(table);

      expect(result[0].typeDisplay).toBe('TypeA');
    });

    it('preserves text alongside Table references', () => {
      const typeCell = [createElement(TableRef, { id: 'TypeA', key: 'ref' }), ' or String'];
      const table = buildTableElement([['name', 'Required', 'A description', typeCell]]);
      const result = parseTableChildren(table);

      expect(result[0].typeDisplay).toEqual(['TypeA', ' or String']);
    });

    it('replaces multiple Table elements with their IDs', () => {
      const typeCell = [
        createElement(TableRef, { id: 'TypeA', key: 'a' }),
        ' or ',
        createElement(TableRef, { id: 'TypeB', key: 'b' }),
      ];
      const table = buildTableElement([['name', 'Required', 'A description', typeCell]]);
      const result = parseTableChildren(table);

      expect(result[0].typeDisplay).toEqual(['TypeA', ' or ', 'TypeB']);
    });
  });

  describe('column format handling', () => {
    it('parses 4-column tables with required field', () => {
      const table = buildTableElement([['myProp', 'Required', 'A description', 'String']]);
      const result = parseTableChildren(table);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('myProp');
      expect(result[0].required).toBe('required');
    });

    it('parses 4-column tables with optional field', () => {
      const table = buildTableElement([['myProp', 'Optional', 'A description', 'String']]);
      const result = parseTableChildren(table);

      expect(result[0].required).toBe('optional');
    });

    it('parses 3-column tables without required field', () => {
      const table = buildTableElement([['myProp', 'A description', 'Number']]);
      const result = parseTableChildren(table);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('myProp');
      expect(result[0].required).toBeUndefined();
    });

    it('parses multiple rows independently', () => {
      const table = buildTableElement([
        ['prop1', 'Required', 'First prop', 'String'],
        ['prop2', 'Optional', 'Second prop', createElement(TableRef, { id: 'TypeA' })],
      ]);
      const result = parseTableChildren(table);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('prop1');
      expect(result[0].typeReferences).toEqual([]);
      expect(result[1].name).toBe('prop2');
      expect(result[1].typeReferences).toEqual(['TypeA']);
    });
  });
});

describe('NestedTablePropertyRow', () => {
  /**
   * Helper component that registers a table in the NestedTable context.
   * Uses useEffect to mirror how real NestedTable components register.
   */
  const RegisterTable: React.FC<{ id: string; properties: TableProperty[] }> = ({ id, properties }) => {
    const { register } = useNestedTable();
    React.useEffect(() => {
      register(id, { id, properties });
    }, [id, properties, register]);
    return null;
  };

  const typeAProperties: TableProperty[] = [{ name: 'fieldA', description: 'Field A description', typeReferences: [] }];
  const typeBProperties: TableProperty[] = [{ name: 'fieldB', description: 'Field B description', typeReferences: [] }];

  it('renders expand buttons for each resolved type reference', async () => {
    const property: TableProperty = {
      name: 'myProp',
      description: 'A test property',
      typeReferences: ['TypeA', 'TypeB'],
      typeDisplay: 'TypeA or TypeB',
    };

    render(
      <NestedTableProvider>
        <RegisterTable id="TypeA" properties={typeAProperties} />
        <RegisterTable id="TypeB" properties={typeBProperties} />
        <NestedTablePropertyRow property={property} path="test" />
      </NestedTableProvider>,
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Show TypeA/ })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Show TypeB/ })).toBeInTheDocument();
    });
  });

  it('expands each reference independently', async () => {
    const property: TableProperty = {
      name: 'myProp',
      description: 'A test property',
      typeReferences: ['TypeA', 'TypeB'],
      typeDisplay: 'TypeA or TypeB',
    };

    render(
      <NestedTableProvider>
        <RegisterTable id="TypeA" properties={typeAProperties} />
        <RegisterTable id="TypeB" properties={typeBProperties} />
        <NestedTablePropertyRow property={property} path="test" />
      </NestedTableProvider>,
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Show TypeA/ })).toBeInTheDocument();
    });

    // Expand TypeA
    fireEvent.click(screen.getByRole('button', { name: /Show TypeA/ }));

    // TypeA is now expanded (Hide), TypeB is still collapsed (Show)
    expect(screen.getByRole('button', { name: /Hide TypeA/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Show TypeB/ })).toBeInTheDocument();

    // The expanded section shows TypeA's nested property
    expect(screen.getByText('fieldA')).toBeInTheDocument();
    // TypeB's property is not visible
    expect(screen.queryByText('fieldB')).not.toBeInTheDocument();
  });

  it('only renders buttons for references that resolve to registered tables', async () => {
    const property: TableProperty = {
      name: 'myProp',
      description: 'A test property',
      typeReferences: ['TypeA', 'UnregisteredType'],
      typeDisplay: 'TypeA or UnregisteredType',
    };

    render(
      <NestedTableProvider>
        <RegisterTable id="TypeA" properties={typeAProperties} />
        {/* UnregisteredType is intentionally NOT registered */}
        <NestedTablePropertyRow property={property} path="test" />
      </NestedTableProvider>,
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Show TypeA/ })).toBeInTheDocument();
    });

    // No button for the unregistered type
    expect(screen.queryByRole('button', { name: /Show UnregisteredType/ })).not.toBeInTheDocument();
  });

  it('renders no buttons when there are no type references', () => {
    const property: TableProperty = {
      name: 'myProp',
      description: 'A simple property',
      type: 'String',
      typeReferences: [],
    };

    render(
      <NestedTableProvider>
        <NestedTablePropertyRow property={property} path="test" />
      </NestedTableProvider>,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('displays typeDisplay text when available', async () => {
    const property: TableProperty = {
      name: 'myProp',
      description: 'A test property',
      typeReferences: ['TypeA'],
      typeDisplay: 'TypeA or String',
    };

    render(
      <NestedTableProvider>
        <RegisterTable id="TypeA" properties={typeAProperties} />
        <NestedTablePropertyRow property={property} path="test" />
      </NestedTableProvider>,
    );

    expect(screen.getByText('TypeA or String')).toBeInTheDocument();
  });
});
