import React from 'react';
import { connect, } from 'react-redux';
import axios from 'axios';
const FIRST = 'First';
const LAST = 'Last';
const USERNAME = 'Username';

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
    this.RenderSelected = this.RenderSelected.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
    this.handleSelectClick = this.handleSelectClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
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
  handleSelectClick(evt) {
    const id = +evt.target.getAttribute('data');
    this.setState(prevState => {
      const idx = prevState.users.findIndex(user => {
        return user.id === id;
      });
      if (idx === undefined) return undefined;

      const selectedUsers = [...prevState.selectedUsers, prevState.users[idx], ];

      const users =
        idx === 0
          ? prevState.users.slice(1)
          : prevState.users
              .slice(0, idx)
              .concat(prevState.users.slice(idx + 1));

      return { users, selectedUsers, };
    }, this.filterAndSortUsers);
  }
  handleSubmit(){
    const usersIds = this.state.selectedUsers.map(user => user.id)
    console.log('usersIds: ', usersIds);
    const group = this.props.groupId
    axios.post('/api/groups/addusers/', {usersIds, group, })
  }
  handleRemoveClick(evt) {
    const id = +evt.target.getAttribute('data');
    this.setState(prevState => {
      const idx = prevState.selectedUsers.findIndex(user => {
        return user.id === id;
      });
      if (idx === undefined) return undefined;

      const users = [...prevState.users, prevState.selectedUsers[idx], ];
      const selectedUsers =
        idx === 0
          ? prevState.selectedUsers.slice(1)
          : prevState.selectedUsers
              .slice(0, idx)
              .concat(prevState.selectedUsers.slice(idx + 1));
      return { users, selectedUsers, };
    }, this.filterAndSortUsers);
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
  // renders syle={{ }}
  render() {
    const RenderHeader = this.RenderHeader;
    const RenderBody = this.RenderBody;
    const RenderSelected = this.RenderSelected;
    return (
      <div>
        {/* todo remove inline styles */}
        <input type="search" onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>submit</button>
        {this.state.isLoaded ? (
          <div style={{ color: 'white', height: '15vw', overflow: 'auto', }}>
            <table border="1">
              <RenderHeader />
              <RenderBody />
            </table>
          </div>
        ) : (
          <h2>Please begin typing while the data is loaded</h2>
        )}
        <div style={{ color: 'white', }}>
          <h2>Selected Users</h2>
          <div style={{ color: 'white', height: '15vw', overflow: 'auto', }}>
      {RenderSelected()}
          </div>
        </div>
      </div>
    );
  }
  RenderHeader() {
    const sortUnicode = this.state.sortAsc ? '⬇' : '⬆';

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
            <td>
              <button data={user.id} onClick={this.handleSelectClick}>
                +
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
  RenderSelected() {
    const handleRemoveClick = this.handleRemoveClick;
    const selectedUsers = this.state.selectedUsers.sort((userA, userB) => {
      let aVal, bVal;
      switch (this.state.sortBy) {
        case 'first':
          aVal = userA.lowFirst;
          bVal = userB.lowFirst;
          break;
        default:
          return 0;
      }
      if (aVal < bVal) {
        return -1;
      } else {
        return 1;
      }
    });

    return (
      <table border="1">
        <thead>
          <tr>
            <th>{FIRST}</th>
            <th>{LAST}</th>
            <th>{USERNAME}</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {selectedUsers.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.displayName}</td>
                <td>
                  <button data={user.id} onClick={handleRemoveClick}>
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
const mapState = (state, ownProps) => ({
  groupId: ownProps.match.params.id,
});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(AddMembersToGroups);
