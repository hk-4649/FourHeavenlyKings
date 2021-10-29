import { createSlice } from "@reduxjs/toolkit";

const members = [
  {
    id: 1,
    member: {
      name: "ギリー",
      status: {
        str: 5,
        agl: 4,
        ran: 1,
        sus: 3,
        dex: 2,
        pot: 5,
      },
    },
  },
  {
    id: 2,
    member: {
      name: "神谷",
      status: {
        str: 5,
        agl: 4,
        ran: 4,
        sus: 4,
        dex: 4,
        pot: 5,
      },
    },
  },
  {
    id: 3,
    member: {
      name: "初芝",
      status: {
        str: 5,
        agl: 5,
        ran: 5,
        sus: 5,
        dex: 5,
        pot: 5,
      },
    },
  },
];

const defaultMember = {
  name: "",
  status: {
    str: 1,
    agl: 1,
    ran: 1,
    sus: 1,
    dex: 1,
    pot: 1,
  },
};
export const memberSlice = createSlice({
  name: "member",
  initialState: {
    idCount: members.length,
    members,
    selectedMember: {},
    isNew: false,
  },
  reducers: {
    newMember: (state, action) => {
      state.idCount++;
      const newItem = {
        id: state.idCount,
        member: action.payload,
      };
      state.members = [newItem, ...state.members];
      state.isNew = false;
    },
    editMember: (state, action) => {
      const { id, member } = action.payload;
      const item = state.members.find((t) => t.id === id);
      item.member = member;
    },
    selectMember: (state, action) => {
      if (action.payload) {
        state.selectedMember = action.payload;
        state.isNew = false;
      } else {
        state.selectedMember = {
          id: state.idCount + 1,
          member: defaultMember,
        };
        state.isNew = true;
      }
    },
    deleteMember: (state, action) => {
      const { id } = action.payload;
      state.members = state.members.filter((t) => t.id !== id);
      if (state.selectedMember.id === id) {
        state.selectedMember = {};
      }
    },
  },
});

export const { newMember, editMember, selectMember, deleteMember } =
  memberSlice.actions;

export const selectMembers = (state) => state.member.members;
export const selectSelectedMembers = (state) => state.member.selectedMember;
export const selectIsNewMember = (state) => state.member.isNew;

export default memberSlice.reducer;
