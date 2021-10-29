import NativeDataSource from "./nativeDataSource";

export default class DataElements extends NativeDataSource {
  async getDataSources(engine: any, { page, filter }: { page: number; filter: Array<string> }) {
    const finalFilter = [...(filter ?? []), `valueType:eq:NUMBER`];
    return super.getDataSources(engine, { page, filter: finalFilter });
  }
}
