import { keys, type Archive } from "@/utils/types";
import Fuse from "fuse.js";

export default () => ({
  query: "",
  hits: 0,
  current: 1,
  itemsPerPage: 20,
  filterColumn: "",
  filterValue: "",
  sortColumn: "",
  sortAsc: false,
  items: [] as any[],
  index: undefined,
  fuse: Fuse.prototype,
  async init() {
    const response = await fetch("/archive/data.json");
    const json = await response.json();
    this.items = json.archives as Archive[];
    // @ts-expect-error because it's yelling
    this.index = Fuse.parseIndex<Archive>(json.index);
    const options = { keys };
    this.fuse = new Fuse<Archive>(this.items, options, this.index);
  },
  sort(column: string) {
    if (this.sortColumn == column) { this.sortAsc = !this.sortAsc; }
    this.sortColumn = column;
    this.items.sort((a: any, b: any) => {
      if (a[this.sortColumn] < b[this.sortColumn]) return this.sortAsc ? 1 : -1;
      if (a[this.sortColumn] > b[this.sortColumn]) return this.sortAsc ? -1 : 1;
      return 0;
    });
  },
  filterBy(column: string, value: string) {
    this.filterColumn = column;
    this.filterValue = value;
    this.current = 1;
  },
  get results() {
    let items = this.items;
    if (this.query !== "") {
      items = this.fuse.search(this.query).map(result => result.item);
    }
    if (this.filterColumn !== "" && this.filterValue !== "") {
      if (this.filterColumn == "tool" || this.filterColumn == "level") {
        items = items.filter(item => 
          Object.values(item[this.filterColumn]).some(value => value == this.filterValue)
        );
      } else {
        items = items.filter(item => item[this.filterColumn] == this.filterValue);
      }
    }
    const start = (this.current - 1) * this.itemsPerPage;
    const end = this.current * this.itemsPerPage;
    this.hits = items.length;
    return items.slice(start, end);
  },
  get total() {
    return Math.ceil(this.hits / this.itemsPerPage);
  },
  previous() {
    if (this.current > 1) { this.current--; }
  },
  next() {
    if (this.current < this.total) { this.current++; }
  },
});