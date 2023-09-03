import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUserAction, setSelectedUserAction } from "../../store/actions/userAction";

class UserManagement extends Component {
  state = {
    keyword: "",
  };
  renderContent = () => {
    const data = this.props.danhSachSinhVien.filter((element) => {
      return (
        element.hoTen
          .toLowerCase()
          .indexOf(this.state.keyword.toLowerCase()) !== -1
      );
    });
    return data.map((element, index) => {
      const className = index % 2 === 0 ? "bg-light" : "";
      return (
        <tr key={element.id} className={className}>
          <td>{element.maSV}</td>
          <td>{element.hoTen}</td>
          <td>{element.phoneNumber}</td>
          <td>{element.email}</td>
          <td>
            <button 
              onClick={() => {
                this.props.dispatch(setSelectedUserAction(element));
              }}
              className="btn btn-info mr-2"
            >
              SỬA
            </button>
            <button
              onClick={() => {
                this.props.dispatch(deleteUserAction(element));
              }}
              className="btn btn-danger"
            >
              XÓA
            </button>
          </td>
        </tr>
      );
    });
  };
  handleChange = (event) => {
    this.setState({
      keyword: event.target.value,
    });
  };
  render() {
    return (
      <div className="card p-0 mt-3">
        <div className="card-header bg-info font-weight-bold text-white">
          QUẢN LÝ SINH VIÊN
        </div>
        <div className="row mt-4 px-3 ">
          <div className="col-12">
            <div className="form-group mb-0">
              <input
                onChange={this.handleChange}
                type="text"
                placeholder="Search by full name..."
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Mã Sinh Viên</th>
                <th>Họ Tên</th>
                <th>Số Điện Thoại</th>
                <th>Email</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>{this.renderContent()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    danhSachSinhVien: state.sinhVienReducer.sinhVienList,
  };
};
export default connect(mapStateToProps)(UserManagement);
