import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import jscodeshift, { API, FileInfo } from 'jscodeshift';
import { describe, it } from 'vitest';
import transform from '../src/index';

export const buildApi = (parser: string | undefined): API => ({
  j: parser ? jscodeshift.withParser(parser) : jscodeshift,
  jscodeshift: parser ? jscodeshift.withParser(parser) : jscodeshift,
  stats: () => {
    console.error(
      'The stats function was called, which is not supported on purpose',
    );
  },
  report: () => {
    console.error(
      'The report function was called, which is not supported on purpose',
    );
  },
});

describe('Context.Provider -> Context', () => {
  describe('javascript code', () => {
    it('should replace ThemeContext.Provider with ThemeContext', async () => {
      const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture1.input.jsx'), 'utf-8');
      const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture1.output.jsx'), 'utf-8');

      const fileInfo: FileInfo = {
        path: 'index.ts',
        source: INPUT,
      };

      const actualOutput = transform(fileInfo, buildApi('js'));

      assert.deepEqual(
        actualOutput?.replace(/\W/gm, ''),
        OUTPUT.replace(/\W/gm, ''),
      );
    });

    it('should replace Context.Provider with Context', async () => {
      const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture2.input.jsx'), 'utf-8');
      const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture2.output.jsx'), 'utf-8');

      const fileInfo: FileInfo = {
        path: 'index.ts',
        source: INPUT,
      };

      const actualOutput = transform(fileInfo, buildApi('js'));

      assert.deepEqual(
        actualOutput?.replace(/\W/gm, ''),
        OUTPUT.replace(/\W/gm, '')
      );
    });

    it('should do nothing if .Provider does not exist', async () => {
      const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture3.input.jsx'), 'utf-8');
      const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture3.output.jsx'), 'utf-8');

      const fileInfo: FileInfo = {
        path: 'index.ts',
        source: INPUT,
      };

      const actualOutput = transform(fileInfo, buildApi('js'));

      assert.deepEqual(
        actualOutput?.replace(/\W/gm, ''),
        OUTPUT.replace(/\W/gm, '')
      );
    });
  });

  describe('typescript code', () => {
    it('should replace ThemeContext.Provider with ThemeContext', async () => {
      const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture4.input.tsx'), 'utf-8');
      const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture4.output.tsx'), 'utf-8');

      const fileInfo: FileInfo = {
        path: 'index.ts',
        source: INPUT,
      };

      const actualOutput = transform(fileInfo, buildApi('tsx'));

      assert.deepEqual(
        actualOutput?.replace(/\W/gm, ''),
        OUTPUT.replace(/\W/gm, '')
      );
    });

    it('should replace Context.Provider with Context', async () => {
      const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture5.input.tsx'), 'utf-8');
      const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture5.output.tsx'), 'utf-8');

      const fileInfo: FileInfo = {
        path: 'index.ts',
        source: INPUT,
      };

      const actualOutput = transform(fileInfo, buildApi('tsx'));

      assert.deepEqual(
        actualOutput?.replace(/\W/gm, ''),
        OUTPUT.replace(/\W/gm, '')
      );
    });

    it('should do nothing if .Provider does not exist', async () => {
      const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture6.input.tsx'), 'utf-8');
      const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture6.output.tsx'), 'utf-8');

      const fileInfo: FileInfo = {
        path: 'index.ts',
        source: INPUT,
      };

      const actualOutput = transform(fileInfo, buildApi('tsx'));

      assert.deepEqual(
        actualOutput?.replace(/\W/gm, ''),
        OUTPUT.replace(/\W/gm, '')
      );
    });
  });
});
