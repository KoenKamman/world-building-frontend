interface ResourceService {
  setAll(resources: Array<Object>): void;
  getAll(): void;
  getOne(resource: Object): Object;
  // getChanged(): Subject<Array>;
  getChanged();
  deleteOne(id: string, resource: Object): void;
  addOne(resource: Object);
  updateOne(id: string, resource: Object);
}
