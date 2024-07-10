/* eslint-disable react/prop-types */
import { TableCell, TableRow } from "@nextui-org/table";
import first from "../../assets/first.svg";
import second from "../../assets/second.svg";
import third from "../../assets/third.svg";

const RowLeaderboard = ({ idx, rs }) => {

  return (
      <TableRow className="py-3">
        <TableCell>
          {idx <= 2 ? (
            <img
              src={idx == 0 ? first : idx == 1 ? second : third}
              className="w-9 h-9"
            />
          ) : (
            <p className="pl-3 font-light">{idx + 1}.</p>
          )}
        </TableCell>
        <TableCell className="w-72 py-4 font-light">{rs.username}</TableCell>
        <TableCell className="pl-20">{rs.solvedQuestions}</TableCell>
        <TableCell className="pl-6">{rs.score}</TableCell>
      </TableRow>
  );
};

export default RowLeaderboard;
