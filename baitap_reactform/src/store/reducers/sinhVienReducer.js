import danhSachSinhVien from "../../data/danhSachSinhVien.json";
const DEFAULT_STATE = {
  sinhVienList: danhSachSinhVien,
  selectedUser: null,
};
const stringify = localStorage.getItem("SINHVIEN_LIST");
if (stringify) {
  DEFAULT_STATE.sinhVienList = JSON.parse(stringify);
}
export const sinhVienReducer = (state = DEFAULT_STATE, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "ADD_USER": {
      if (
        window.confirm(
          `Bạn có chắc muốn thêm sinh viên ${action.payload.maSV} không?`
        )
      ) {
        state.sinhVienList = [...state.sinhVienList, action.payload];
        localStorage.setItem(
          "SINHVIEN_LIST",
          JSON.stringify(state.sinhVienList)
        );
        break;
      }
      break;
    }
    // eslint-disable-next-line no-fallthrough
    case "SET_SELECTED_USER": {
      state.selectedUser = action.payload;
      break;
    }
    case "UPDATE_USER": {
      if (
        window.confirm(
          `Bạn có chắc muốn cập nhật cho sinh viên ${action.payload.maSV} không?`
        )
      ) {
        const data = [...state.sinhVienList];
        const index = data.findIndex(
          (element) => element.maSV === action.payload.maSV
        );
        data[index] = action.payload;
        state.selectedUser = null;
        state.sinhVienList = data;
        localStorage.setItem(
          "SINHVIEN_LIST",
          JSON.stringify(state.sinhVienList)
        );
        break;
      }
      break;
    }
    // eslint-disable-next-line no-fallthrough
    case "DELETE_USER": {
      if (
        window.confirm(
          `Bạn có chắc muốn xóa sinh viên ${action.payload.maSV} không?`
        )
      ) {
        const data = [...state.sinhVienList];
        const index = data.findIndex(
          (element) => element.maSV === action.payload.maSV
        );
        data.splice(index, 1);
        state.sinhVienList = data;
        localStorage.setItem(
          "SINHVIEN_LIST",
          JSON.stringify(state.sinhVienList)
        );
        break;
      }
      break;
    }
  }
  return { ...state };
};
