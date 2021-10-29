import React from "react";
import styles from "./member.module.css";
import Delete from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { selectMember, deleteMember } from "./memberSlice";

export const Items = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  return (
    <>
      <span
        className={styles.cursor}
        onClick={() => dispatch(selectMember(item))}
      >
        {item.member.name}
      </span>
      <div>
        <button
          className={styles.taskIcon}
          onClick={() => dispatch(deleteMember(item))}
        >
          <Delete />
        </button>
      </div>
    </>
  );
};
