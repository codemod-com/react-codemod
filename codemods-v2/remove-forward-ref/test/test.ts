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

describe("react/remove-forward-ref", () => {
	it("Unwraps the render function: render function is ArrowFunctionExpression", async () => {
    const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture1.input.jsx'), 'utf-8');
    const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture1.output.jsx'), 'utf-8');

		const fileInfo: FileInfo = {
			path: "index.js",
			source: INPUT,
		};

		const actualOutput = transform(fileInfo, buildApi("tsx"));

		assert.deepEqual(
			actualOutput?.replace(/\s/gm, ""),
			OUTPUT.replace(/\s/gm, ""),
		);
	});

	it("Unwraps the render function: render function is FunctionExpression", async () => {
    const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture2.input.jsx'), 'utf-8');
    const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture2.output.jsx'), 'utf-8');

		const fileInfo: FileInfo = {
			path: "index.js",
			source: INPUT,
		};

		const actualOutput = transform(fileInfo, buildApi("tsx"));

		assert.deepEqual(
			actualOutput?.replace(/\s/gm, ""),
			OUTPUT.replace(/\s/gm, ""),
		);
	});

	it("forwardRef import: removes the import when only forwardRef is a single specifier", async () => {
    const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture3.input.jsx'), 'utf-8');
    const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture3.output.jsx'), 'utf-8');

		const fileInfo: FileInfo = {
			path: "index.js",
			source: INPUT,
		};

		const actualOutput = transform(fileInfo, buildApi("tsx"));

		assert.deepEqual(
			actualOutput?.replace(/\s/gm, ""),
			OUTPUT.replace(/\s/gm, ""),
		);
	});

	it("forwardRef import: should not remove type imports", async () => {
    const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture4.input.tsx'), 'utf-8');
    const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture4.output.tsx'), 'utf-8');

		const fileInfo: FileInfo = {
			path: "index.js",
			source: INPUT,
		};

		const actualOutput = transform(fileInfo, buildApi("tsx"));

		assert.deepEqual(
			actualOutput?.replace(/\s/gm, ""),
			OUTPUT.replace(/\s/gm, ""),
		);
	});

	it("forwardRef import: removes forwardRef specifier", async () => {
    const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture5.input.jsx'), 'utf-8');
    const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture5.output.jsx'), 'utf-8');

		const fileInfo: FileInfo = {
			path: "index.js",
			source: INPUT,
		};

		const actualOutput = transform(fileInfo, buildApi("tsx"));

		assert.deepEqual(
			actualOutput?.replace(/\s/gm, ""),
			OUTPUT.replace(/\s/gm, ""),
		);
	});

	it("Replaces the second arg of the render function: props are ObjectPattern", async () => {
    const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture6.input.jsx'), 'utf-8');
    const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture6.output.jsx'), 'utf-8');

		const fileInfo: FileInfo = {
			path: "index.js",
			source: INPUT,
		};

		const actualOutput = transform(fileInfo, buildApi("tsx"));

		assert.deepEqual(
			actualOutput?.replace(/\s/gm, ""),
			OUTPUT.replace(/\s/gm, ""),
		);
	});

	it("Replaces the second arg of the render function: props are Identifier", async () => {
    const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture7.input.jsx'), 'utf-8');
    const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture7.output.jsx'), 'utf-8');

		const fileInfo: FileInfo = {
			path: "index.js",
			source: INPUT,
		};

		const actualOutput = transform(fileInfo, buildApi("tsx"));

		assert.deepEqual(
			actualOutput?.replace(/\s/gm, ""),
			OUTPUT.replace(/\s/gm, ""),
		);
	});

	it("Typescript: reuses forwardRef typeArguments", async () => {
    const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture8.input.tsx'), 'utf-8');
    const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture8.output.tsx'), 'utf-8');

		const fileInfo: FileInfo = {
			path: "index.js",
			source: INPUT,
		};

		const actualOutput = transform(fileInfo, buildApi("tsx"));
		assert.deepEqual(
			actualOutput?.replace(/\s/gm, ""),
			OUTPUT.replace(/\s/gm, ""),
		);
	});

	it("Typescript: reuses wrapped function type arguments", async () => {
    const INPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture9.input.tsx'), 'utf-8');
    const OUTPUT = await readFile(join(__dirname, '..', '__testfixtures__/fixture9.output.tsx'), 'utf-8');

		const fileInfo: FileInfo = {
			path: "index.js",
			source: INPUT,
		};

		const actualOutput = transform(fileInfo, buildApi("tsx"));
		assert.deepEqual(
			actualOutput?.replace(/\s/gm, ""),
			OUTPUT.replace(/\s/gm, ""),
		);
	});
});
