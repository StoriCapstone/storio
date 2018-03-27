import React from 'react';
import { connect, } from 'react-redux';
import axios from 'axios';

class AddMembersToGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      users: [],
      sortBy: 'first',
      sortAsc: true,
      searchStr: '',
    };
    this.handleChange = this.handleChange.bind(this)
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
        this.setState({ users, isLoaded: true, });
      });
  }
  handleChange(evt) {
    this.setState({ searchStr: evt.target.value.toLowerCase(), });
  }
  render() {
    const searchStr = this.state.searchStr;
    const sortUnicode = this.state.sortAsc ? '⬇' : '⬆';
    const FIRST = 'First';
    const LAST = 'Last';
    const USERNAME = 'Username';
    return (
      <div>
        <input type="search" onChange={this.handleChange} />
        {this.state.isLoaded ? (
          <table border="1">
            <thead>
              <tr>
                <th>
                  {this.state.sortBy === 'first'
                    ? `${FIRST} ${sortUnicode}`
                    : FIRST}
                </th>
                <th>
                  {this.state.sortBy === 'last'
                    ? `${LAST} ${sortUnicode}`
                    : LAST}
                </th>
                <th>
                  {this.state.sortBy === 'username'
                    ? `${USERNAME} ${sortUnicode}`
                    : USERNAME}
                </th>
                <th>-</th>
                {/* empty, for `select user` */}
              </tr>
            </thead>
            <tbody>
              {this.state.users
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
                })
                .map(user => (
                  <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.displayName}</td>
                    <td>select user</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <h2>Please begin typing while the data is fetched</h2>
        )}
      </div>
    );
  }
}
const mapState = (state, ownProps) => ({
  groupId: ownProps.match.params.id,
});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(AddMembersToGroups);
