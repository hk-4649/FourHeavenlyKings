import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { editMember } from "./memberSlice";
import { PowerSlider } from "./PowerSlider";
import { Chart } from "./Chart";
import styles from "./member.module.css";

const statusArray = ["str", "agl", "ran", "sus", "dex", "pot"];
const toJapanese = {
  str: "破壊力",
  agl: "スピード",
  ran: "射程距離",
  sus: "持続力",
  dex: "精密動作性",
  pot: "成長性",
};

export const DetailBody = (props) => {
  const { member, id } = props;
  const dispatch = useDispatch();
  const [status, setStatus] = useState({});
  useEffect(() => {
    setStatus({});
  }, [id]);
  const chartData = Object.entries(member.status).map(
    ([key, value]) => status[key] ?? value
  );
  const editedStatus = statusArray.reduce(
    (acc, cur, i) => ({ ...acc, [cur]: chartData[i] }),
    {}
  );
  return (
    <>
      <div className={styles.contents}>
        <div className={styles.item}>
          <Chart data={chartData} />
        </div>
        <div className={styles.item}>
          {statusArray.map((e, i) => (
            <PowerSlider
              key={i}
              label={toJapanese[e]}
              value={status[e] ?? chartData[i]}
              onChange={(_, val) => setStatus({ ...status, [e]: val })}
            />
          ))}
        </div>
      </div>
      <div className={styles.saveIcon}>
        <Button
          disabled={!Object.keys(status).length}
          onClick={() =>
            dispatch(
              editMember({ id, member: { ...member, status: editedStatus } })
            )
          }
          variant="outlined"
        >
          保存
        </Button>
      </div>
    </>
  );
};
