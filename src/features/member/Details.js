import React from "react";
import styles from "./member.module.css";
import { useSelector } from "react-redux";
import { selectSelectedMembers } from "./memberSlice";
import { DetailBody } from "./DetailBody";

export const Details = () => {
  const { member, id } = useSelector(selectSelectedMembers);
  if (!member) {
    return null;
  }
  return (
    <>
      <div className={styles.details}>{member.name}</div>
      <DetailBody member={member} id={id} />
    </>
  );
};
