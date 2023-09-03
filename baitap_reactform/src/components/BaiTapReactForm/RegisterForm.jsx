import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { addUserAction, updateUserAction } from "../../store/actions/userAction";

class RegisterForm extends Component {
  maSVInputRef = createRef();
  hoTenInPutRef = createRef();
  phoneNumberInputRef = createRef();
  emailInputRef = createRef();
  state = {
    maSV: "",
    hoTen: "",
    phoneNumber: "",
    email: "",
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  validationRequired = (value, ref, message) => {
    if (value) {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = message;
    return false;
  };
  validationNumber = (value, ref, message) => {
    if (/^[0-9]+$/.test(value)) {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = message;
    return false;
  };
  validationHoTen = (value, ref, message) => {
    if (
      /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷýỹ\ ]+$/.test(
        value
      )
    ) {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = message;
    return false;
  };
  validationEmail = (value, ref, message) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = message;
    return false;
  };
  validationMaSVDaTonTai = (value, ref, message) => {
    let isExist = false;
    for (const index in this.props.sinhVienList) {
      let user = this.props.sinhVienList[index];
      if (user.maSV == value) {
        isExist = true;
        break;
      }
    }
    if (isExist) {
      ref.innerHTML = message;
      return false;
    }
    ref.innerHTML = "";
    return true;
  };
  //convert props sang state dùng getDerivedStateFromProps life cycle
  static getDerivedStateFromProps(nextProps, currentState) {
    if (
      nextProps.selectedUser &&
      nextProps.selectedUser.maSV !== currentState.maSV
    ) {
      currentState = nextProps.selectedUser;
    }
    return currentState;
  }
  //hàm sự kiện ở form khi nhấn nút lưu
  handSubmit = (event) => {
    //chống load lại trang khi nhấn nút
    event.preventDefault();
    let isValid = true;
    //valiadation maSV
    if (this.props.selectedUser) {
      isValid = true;
    } else {
      isValid &=
        this.validationRequired(
          this.state.maSV,
          this.maSVInputRef.current,
          "(*) Vui lòng nhập mã sinh viên"
        ) &&
        this.validationNumber(
          this.state.maSV,
          this.maSVInputRef.current,
          "(*) Nhập mã sinh viên bằng chữ số"
        ) &&
        this.validationMaSVDaTonTai(
          this.state.maSV,
          this.maSVInputRef.current,
          "(*) Mã sinh viên đã tồn tại"
        );
    }
    //validation hoTen
    isValid &=
      this.validationRequired(
        this.state.hoTen,
        this.hoTenInPutRef.current,
        "(*) Vui lòng nhập họ tên"
      ) &&
      this.validationHoTen(
        this.state.hoTen,
        this.hoTenInPutRef.current,
        "(*) Nhập họ tên bằng chữ cái"
      );
    //validation phoneNumber
    isValid &=
      this.validationRequired(
        this.state.phoneNumber,
        this.phoneNumberInputRef.current,
        "(*) Vui lòng nhập số điện thoại"
      ) &&
      this.validationNumber(
        this.state.phoneNumber,
        this.phoneNumberInputRef.current,
        "(*) Nhập số điện thoại bằng chữ số"
      );
    //validation email
    isValid &=
      this.validationRequired(
        this.state.email,
        this.emailInputRef.current,
        "(*) Vui lòng nhập email"
      ) &&
      this.validationEmail(
        this.state.email,
        this.emailInputRef.current,
        "(*) Nhập email đúng định dạng"
      );
    if (isValid) {
      if (this.props.selectedUser) {
        this.props.dispatch(updateUserAction(this.state));
        this.setState({
          maSV: "",
          hoTen: "",
          phoneNumber: "",
          email: "",
        });
      } else {
        this.props.dispatch(addUserAction(this.state));
        this.setState({
          maSV: "",
          hoTen: "",
          phoneNumber: "",
          email: "",
        });
      }
    }
  };
  
  
  render() {
    return (
      <div className="card p-0">
        <div className="card-header bg-warning text-white font-weight-bold">
          THÔNG TIN SINH VIÊN
        </div>
        <div className="card-body">
          <form onSubmit={this.handSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Mã Sinh Viên</label>
                  <input
                    disabled={this.props.selectedUser ? true : false}
                    value={this.state.maSV}
                    onChange={this.handleChange}
                    name="maSV"
                    type="text"
                    className="form-control"
                  />
                  <span ref={this.maSVInputRef} className="text-danger"></span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Họ Tên</label>
                  <input
                    value={this.state.hoTen}
                    onChange={this.handleChange}
                    name="hoTen"
                    type="text"
                    className="form-control"
                  />
                  <span  ref={this.hoTenInPutRef} className="text-danger"></span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Số Điện Thoại</label>
                  <input
                    value={this.state.phoneNumber}
                    onChange={this.handleChange}
                    name="phoneNumber"
                    type="text"
                    className="form-control"
                  />
                  <span
                    ref={this.phoneNumberInputRef}
                    className="text-danger"
                  ></span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={this.state.email}
                    onChange={this.handleChange}
                    name="email"
                    type="text"
                    className="form-control"
                  />
                  <span ref={this.emailInputRef} className="text-danger"></span>
                </div>
              </div>
            </div>
            <button onClick={this.anThongBao}
              className="btn btn-success mr-2"
              style={{ display: this.props.selectedUser ? "none" : "block" }}
            >
              Thêm Sinh Viên
            </button>
            <button
              className="btn btn-primary mr-2"
              style={{ display: this.props.selectedUser ? "block" : "none" }}
            >
              Cập Nhật
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    sinhVienList: state.sinhVienReducer.sinhVienList,
    selectedUser: state.sinhVienReducer.selectedUser,
  };
};
export default connect(mapStateToProps)(RegisterForm);
