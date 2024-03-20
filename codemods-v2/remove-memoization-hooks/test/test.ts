import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import jscodeshift, { API, FileInfo } from 'jscodeshift';
import { describe, it } from "vitest";
import transform from "../src/index";

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

describe("react/19/remove-memoization-hooks", () => {
	describe("javascript code", () => {
		it("should remove useCallback", async () => {
      const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture1.input.jsx'), 'utf-8');
      const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture1.output.jsx'), 'utf-8');

			const fileInfo: FileInfo = {
				path: "index.ts",
				source: INPUT,
			};

			const actualOutput = transform(fileInfo, buildApi("js"));

			assert.deepEqual(
				actualOutput?.replace(/\W/gm, ""),
				OUTPUT.replace(/\W/gm, ""),
			);
		});

		it("should remove useMemo", async () => {
      const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture2.input.jsx'), 'utf-8');
      const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture2.output.jsx'), 'utf-8');

			const fileInfo: FileInfo = {
				path: "index.ts",
				source: INPUT,
			};

			const actualOutput = transform(fileInfo, buildApi("js"));

			assert.deepEqual(
				actualOutput?.replace(/\W/gm, ""),
				OUTPUT.replace(/\W/gm, ""),
			);
		});

		it("should remove memo", async () => {
      const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture3.input.jsx'), 'utf-8');
      const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture3.output.jsx'), 'utf-8');

			const fileInfo: FileInfo = {
				path: "index.ts",
				source: INPUT,
			};

			const actualOutput = transform(fileInfo, buildApi("js"));

			assert.deepEqual(
				actualOutput?.replace(/\W/gm, ""),
				OUTPUT.replace(/\W/gm, ""),
			);
		});

		it("should remove React.useMemo, React.useCallback, React.memo", async () => {
      const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture4.input.jsx'), 'utf-8');
      const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture4.output.jsx'), 'utf-8');

			const fileInfo: FileInfo = {
				path: "index.ts",
				source: INPUT,
			};

			const actualOutput = transform(fileInfo, buildApi("js"));

			assert.deepEqual(
				actualOutput?.replace(/\W/gm, ""),
				OUTPUT.replace(/\W/gm, ""),
			);
		});
	});

	describe("typescript code", () => {
		it("should remove useCallback", async () => {
      const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture5.input.tsx'), 'utf-8');
      const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture5.output.tsx'), 'utf-8');

			const fileInfo: FileInfo = {
				path: "index.ts",
				source: INPUT,
			};

			const actualOutput = transform(fileInfo, buildApi("tsx"));

			assert.deepEqual(
				actualOutput?.replace(/\W/gm, ""),
				OUTPUT.replace(/\W/gm, ""),
			);
		});

		it("should remove useMemo", async () => {
      const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture6.input.tsx'), 'utf-8');
      const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture6.output.tsx'), 'utf-8');

			const fileInfo: FileInfo = {
				path: "index.ts",
				source: INPUT,
			};

			const actualOutput = transform(fileInfo, buildApi("tsx"));

			assert.deepEqual(
				actualOutput?.replace(/\W/gm, ""),
				OUTPUT.replace(/\W/gm, ""),
			);
		});

		it("should remove memo", async () => {
      const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture7.input.tsx'), 'utf-8');
      const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture7.output.tsx'), 'utf-8');

			const fileInfo: FileInfo = {
				path: "index.ts",
				source: INPUT,
			};

			const actualOutput = transform(fileInfo, buildApi("tsx"));

			assert.deepEqual(
				actualOutput?.replace(/\W/gm, ""),
				OUTPUT.replace(/\W/gm, ""),
			);
		});

		it("should remove React.useMemo, React.useCallback, React.memo", async () => {
      const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture8.input.tsx'), 'utf-8');
      const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture8.output.tsx'), 'utf-8');

			const fileInfo: FileInfo = {
				path: "index.ts",
				source: INPUT,
			};

			const actualOutput = transform(fileInfo, buildApi("tsx"));

			assert.deepEqual(
				actualOutput?.replace(/\W/gm, ""),
				OUTPUT.replace(/\W/gm, ""),
			);
		});
	});
});
