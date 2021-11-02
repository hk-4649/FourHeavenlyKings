import React, { useState, useEffect } from "react";
import styles from "./member.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectSelectedMembers,
  selectIsNewMember,
  newMember,
} from "./memberSlice";
import Button from "@material-ui/core/Button";
import { editMember } from "./memberSlice";
import { PowerSlider } from "./PowerSlider";
import { Chart } from "./Chart";

const statusArray = ["str", "agl", "ran", "sus", "dex", "pot"];
const toJapanese = {
  str: "破壊力",
  agl: "スピード",
  ran: "射程距離",
  sus: "持続力",
  dex: "精密動作性",
  pot: "成長性",
};

export const Details = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState({});
  const { member, id } = useSelector(selectSelectedMembers);
  const isNewMember = useSelector(selectIsNewMember);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!member) return;
    setName(member.name);
    setStatus(member.status);
  }, [member, id]);

  if (!member) {
    return null;
  }
  const chartData = statusArray.map((e) => status[e] ?? 1);
  const labels = statusArray.map((e) => toJapanese[e]);
  const editedMember = {
    name,
    status,
  };
  return (
    <>
      <div className={styles.details}>
        <input
          type="text"
          className={styles.inputLog}
          name="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.contents}>
        <div className={styles.item}>
          <Chart data={chartData} labels={labels} />
        </div>
        <div className={styles.item}>
          {statusArray.map((e, i) => (
            <PowerSlider
              key={i}
              label={toJapanese[e]}
              value={chartData[i]}
              onChange={(_, val) => setStatus({ ...status, [e]: val })}
            />
          ))}
        </div>
      </div>
      <div className={styles.saveIcon}>
        {!isNewMember ? (
          <Button
            onClick={() => dispatch(editMember({ id, member: editedMember }))}
            variant="outlined"
          >
            保存
          </Button>
        ) : (
          <Button
            onClick={() => dispatch(newMember(editedMember))}
            disabled={!name}
            variant="outlined"
          >
            登録
          </Button>
        )}
      </div>
    </>
  );
};
