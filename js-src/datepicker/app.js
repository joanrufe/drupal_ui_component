import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import api from './api'
import './datepicker.scss'
import {t} from '../utils'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(),
      datesWithUsers: [],
      selected: null,
      usersInCurrentDay: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    api.fetchUsers()
      .then(res => {
        res.map(user => moment.unix(user.created).format('YYYYMMDD'))
          .map(date => {
            return !this.state.datesWithUsers.includes(date) && this.setState({
              datesWithUsers: [
                ...this.state.datesWithUsers,
                date
              ]
            })
          })
      })
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  _dayHaveUsers(day) {
    return this.state.datesWithUsers.includes(moment(day).format('YYYYMMDD')) ?
      true : false
  }

  _getUsersByDay(day) {
    api.fetchUsers()
      .then(users => {
        return users.filter(user => {
          return moment.unix(user.created).format('YYYYMMDD') === moment(day).format('YYYYMMDD')
        })
      })
      .then(filtered => this.setState({
        ...this.state,
        usersInCurrentDay: [...filtered]
      }))
  }

  render() {
    return (
      <div className="DatePickerComponent">
        <DatePicker
          inline
          selected={this.state.startDate}
          onChange={this.handleChange}
          dayClassName={day => this._dayHaveUsers(day) ? 'with-users' : false}
          onSelect={date => this._getUsersByDay(date)}
        />
        {this.state.usersInCurrentDay.length > 0 && (
          <UserList users={this.state.usersInCurrentDay} />
        )}
      </div>
    )
  }
}

const UserList = ({ users = [] }) => {
  return (
    <ul className="UserList">
      <h3> {t('Users this day:')} </h3>
      {
        users.map((user, index) => (
          <div className="UserItem" key={index}>
              <a href={`/user/${user.uid}`}>
                {user.name}
              </a>
              <img src={user.avatar}/>
          </div>
        ))
      }
    </ul>
  )
}

export default App