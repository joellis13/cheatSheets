/*****************
 * Parent Class:
 *****************/
import orderBy from "lodash/orderBy";

const invertDirection = {
  asc: "desc",
  desc: "asc",
};

export default class ParentClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // OtherState: stuff,
      columnToSort: "createdOn",
      sortDirection: "desc",
    };
  }

  handleSort = (column) => {
    if (column.id !== "tags") {
      const columnName = column.id;
      this.setState((state) => ({
        columnToSort: columnName,
        sortDirection:
          state.columnToSort === columnName
            ? invertDirection[state.sortDirection]
            : columnName === "createdOn" // More complicated than necessary
            ? "desc" // createdOn defaults to 'desc,'
            : "asc", //  the rest to 'asc'
      }));
    }
  };

  render() {
    return (
      <div>
        <Table
          sortedArticles={orderBy(
            this.articleList(),
            this.state.columnToSort,
            this.state.sortDirection
          )}
          columnToSort={this.state.columnToSort}
          sortDirection={this.state.sortDirection}
          handleSort={this.handleSort}
        />
      </div>
    );
  }
}

/********************
 * Child Component:
 ********************/
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DownArrow from "@material-ui/icons/KeyboardArrowDownRounded";
import UpArrow from "@material-ui/icons/KeyboardArrowUpRounded";

// Set table data/columns etc.

export default function Table(props) {
  <div>
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
            >
              <div
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => props.handleSort(column)} // click here to sort
              >
                {props.columnToSort === column.id ? (
                  props.sortDirection === "asc" ? (
                    <UpArrow className={classes.arrow} />
                  ) : (
                    <DownArrow className={classes.arrow} />
                  )
                ) : null}
                {column.label}
              </div>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </Table>
  </div>;
}
