import fs from "fs/promises";
import { BrowserToolBase } from './base.js';
import { ToolContext, ToolResponse, createSuccessResponse, createErrorResponse } from '../common/types.js';

/**
 * Tool for evaluating JS and saving result to file
 */
export class SnapshotTool extends BrowserToolBase {
  async execute(args: any, context: ToolContext): Promise<ToolResponse> {
    return this.safeExecute(context, async (page) => {
      try {
        const result = await page.evaluate(args.script);
        // Write result to file as stringified JSON
        await fs.writeFile(args.path, JSON.stringify(result, null, 2), 'utf-8');
        return createSuccessResponse('Succeeded');
      } catch (err) {
        return createErrorResponse('Failed: ' + (err instanceof Error ? err.message : String(err)));
      }
    });
  }
}
