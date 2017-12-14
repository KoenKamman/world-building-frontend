interface ResourceService {
  headers: Headers;
  serverUrl: string;
  // resourcesChanged: Subject<Array>;
  resourcesChanged;
  resources: Array;

  setAll(resources: Array): void;
  getAll(): void;
  getOne(resource: Object): Object;
  // getChanged(): Subject<Array>;
  getChanged();
  deleteOne(id: string, resource: Object): void;
  addOne(resource: Object): Promise;
  updateOne(id: string, resource: Object): Promise;
}
