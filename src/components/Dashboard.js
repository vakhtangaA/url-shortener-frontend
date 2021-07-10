import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";

const columns = [
  { field: "n", headerName: "N", width: 90 },
  {
    field: "originalUrl",
    headerName: "Original url",
    width: 250,
  },
  {
    field: "shortUrl",
    headerName: "Short url",
    width: 250,
  },
  {
    field: "visited",
    headerName: "Visited",
    width: 150,
  },
];

function Dashboard() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("/api/urls/")
      .then((res) => {
        console.log(res);
        const rows = res.data.map((item, index) => {
          return {
            id: index + 1,
            n: index + 1,
            originalUrl: item.url,
            shortUrl: `https://url-shortener-gol.herokuapp.com/${item._id}`,
            visited: item.visited,
          };
        });
        setRows(rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ height: 400, padding: "2rem", color: "grey" }}>
      <h3>Total Urls</h3>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
      ></DataGrid>
    </div>
  );
}

export default Dashboard;
