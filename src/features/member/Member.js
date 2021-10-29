import React from "react";
import styles from "./member.module.css";
import { Items } from "./Items";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectMembers, selectMember } from "./memberSlice";
import AddCircle from "@material-ui/icons/AddCircleOutline";

export const Member = () => {
  const members = useSelector(selectMembers);
  const dispatch = useDispatch();
  return (
    <div>
      <ul className={styles.memberList}>
        {members.map((e, i) => (
          <li key={i} className={styles.listItem}>
            <Items item={e} />
          </li>
        ))}
      </ul>
      <button
        className={styles.addIcon}
        onClick={() => dispatch(selectMember())}
      >
        <AddCircle fontSize="large" />
      </button>
    </div>
  );
};
