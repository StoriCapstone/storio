import React from 'react';
import { connect, } from 'react-redux';
import axios from 'axios';

class AddMembersToGroups extends React.Component {
  //Lifecycles
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      users: [],
      selectedUsers: [],
      filteredUsers: [],
      sortBy: 'first',
      sortAsc: true,
      searchStr: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.RenderHeader = this.RenderHeader.bind(this);
    this.RenderBody = this.RenderBody.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
  }
  componentDidMount() {
    axios
      .get('/api/users/not-in/' + this.props.groupId)
      .then(result => result.data)
      .then(users =>
        users.map(user => ({
          ...user,
          lowFirst: user.firstName.toLowerCase(),
          lowLast: user.lastName.toLowerCase(),
          lowDisp: user.displayName.toLowerCase(),
        }))
      )
      .then(users => {
        this.setState({ users, isLoaded: true, }, this.filterAndSortUsers);
      });
  }
  // helpers
  handleSortClick(evt) {
    const sortBy = evt.target.getAttribute('data');
    const stateObj =
      sortBy === this.state.sortBy
        ? { sortAsc: !this.state.sortAsc, }
        : { sortAsc: true, sortBy, };
    this.setState(stateObj, this.filterAndSortUsers);
  }
  handleChange(evt) {
    this.setState(
      { searchStr: evt.target.value.toLowerCase(), },
      this.filterAndSortUsers
    );
  }
  filterAndSortUsers() {
    const users = this.state.users;
    const searchStr = this.state.searchStr;

    const filteredUsers = users
      .filter(
        user =>
          (searchStr
            ? user.lowFirst.includes(searchStr) ||
              user.lowLast.includes(searchStr) ||
              user.lowDisp.includes(searchStr)
            : user)
      )
      .sort((userA, userB) => {
        let aVal, bVal;
        switch (this.state.sortBy) {
          case 'first':
            aVal = userA.lowFirst;
            bVal = userB.lowFirst;
            break;
          case 'last':
            aVal = userA.lowLast;
            bVal = userB.lowLast;
            break;
          case 'username':
            aVal = userA.lowDisp;
            bVal = userB.lowDisp;
            break;
          default:
            return 0;
        }
        if (this.state.sortAsc) {
          if (aVal < bVal) {
            return -1;
          } else {
            return 1;
          }
        } else if (aVal > bVal) {
          return -1;
        } else {
          return 1;
        }
      });
    this.setState({ filteredUsers, });
  }
  // renders
  render() {
    const RenderHeader = this.RenderHeader;
    const RenderBody = this.RenderBody;
    return (
      <div style={{ color: 'white', }}>
        {/* todo remove inline style */}
        <input type="search" onChange={this.handleChange} />
        {this.state.isLoaded ? (
          <table border="1">
            <RenderHeader />
            <RenderBody />
          </table>
        ) : (
          <h2>Please begin typing while the data is loaded</h2>
        )}
      </div>
    );
  }
  RenderHeader() {
    const sortUnicode = this.state.sortAsc ? '⬇' : '⬆';
    const FIRST = 'First';
    const LAST = 'Last';
    const USERNAME = 'Username';
    return (
      <thead>
        <tr>
          <th onClick={this.handleSortClick} data="first">
            {this.state.sortBy === 'first' ? `${FIRST} ${sortUnicode}` : FIRST}
          </th>
          <th onClick={this.handleSortClick} data="last">
            {this.state.sortBy === 'last' ? `${LAST} ${sortUnicode}` : LAST}
          </th>
          <th onClick={this.handleSortClick} data="username">
            {this.state.sortBy === 'username'
              ? `${USERNAME} ${sortUnicode}`
              : USERNAME}
          </th>
          <th>-</th>
        </tr>
      </thead>
    );
  }
  RenderBody() {
    return (
      <tbody>
        {this.state.filteredUsers.map(user => (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.displayName}</td>
            <td>select user</td>
          </tr>
        ))}
      </tbody>
    );
  }
}
const mapState = (state, ownProps) => ({
  groupId: ownProps.match.params.id,
});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(AddMembersToGroups);
