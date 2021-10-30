import React from "react";
import styles from "./member.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectSelectedMembers,
  selectIsNewMember,
  newMember,
  moveSlider,
  editName,
} from "./memberSlice";
import Button from "@material-ui/core/Button";
import { editMember } from "./memberSlice";
import { PowerSlider } from "./PowerSlider";
import { Chart } from "./Chart";

const toJapanese = {
  str: "破壊力",
  agl: "スピード",
  ran: "射程距離",
  sus: "持続力",
  dex: "精密動作性",
  pot: "成長性",
};

export const Details = () => {
  const { member, id } = useSelector(selectSelectedMembers);
  const isNewMember = useSelector(selectIsNewMember);

  const dispatch = useDispatch();
  if (!member) {
    return null;
  }
  const chartData = Object.entries(member.status).map(([, value]) => value);
  const statusArray = Object.entries(member.status).map(([key]) => key);
  const labels = statusArray.map((e) => toJapanese[e]);
  return (
    <>
      <div className={styles.details}>
        <input
          type="text"
          className={styles.inputLog}
          name="username"
          value={member.name}
          onChange={(e) => dispatch(editName(e.target.value))}
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
              onChange={(_, value) => dispatch(moveSlider({ key: e, value }))}
            />
          ))}
        </div>
      </div>
      <div className={styles.saveIcon}>
        {!isNewMember ? (
          <Button
            onClick={() => dispatch(editMember({ id, member }))}
            variant="outlined"
          >
            保存
          </Button>
        ) : (
          <Button
            onClick={() => dispatch(newMember(member))}
            disabled={!member.name}
            variant="outlined"
          >
            登録
          </Button>
        )}
      </div>
    </>
  );
};
