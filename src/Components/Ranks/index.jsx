import { useState, useEffect } from "react";
import api from "../../api";
import "./style.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Ranks = () => {
  const [rankList, setRankList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getRankList.invoke({});
        setRankList(response.data.rankList);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tìm bảng xếp hạng:", error);
        setError("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cellStyle = {
    fontSize: "1.5rem",
    textAlign: "center"
  };

  return (
    <div className="ranks-container" style={{ backgroundColor: "#b44445", padding: "1rem 2rem", borderRadius: "10px" }}>
      <h1 style={{ color: "#f5d612", textAlign: "center", marginBottom: "2rem" }} className="home-title">Bảng xếp hạng</h1>
      <div className="table-wrapper" style={{ overflowY: "auto", maxHeight: "350px" }}>
        {error ? (
          <div className="error-message">{error}</div>
        ) : loading ? (
          <div className="loading-spinner">Đang tải...</div>
        ) : rankList.length === 0 ? (
          <p>Không có dữ liệu để hiển thị.</p>
        ) : (
          <TableContainer component={Paper}>
            <Table
             sx={{ minHeight: 350 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={cellStyle}>Hạng</TableCell>
                  <TableCell style={cellStyle}>Tên</TableCell>
                  <TableCell style={cellStyle}>Điểm số</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rankList.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell style={cellStyle}>{item.rank}</TableCell>
                    <TableCell style={cellStyle}>{item.name}</TableCell>
                    <TableCell style={cellStyle}>{item.totalPoint}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default Ranks;