import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import api from './api'
import './datepicker.scss'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(),
      datesWithUsers: [],
      selected: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    api.fetchUsers()
    .then(res => {
      res.map(user => moment.unix(user.attributes.created).format('YYYYMMDD'))
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

  _getUsersByDay(day){
    console.log(api)
    api.fetchUsers()
    .then(users => users.filter(user => console.log(moment.unix(user.attributes.created))))
    
  }
  

  render() {
    return (
      <DatePicker
        inline
        selected={this.state.startDate}
        onChange={this.handleChange}
        dayClassName={day => this._dayHaveUsers(day)? 'with-users': false}
        onSelect={date => this._getUsersByDay(date)}
        // children={this.state.selected}
      />
    )
  }
}

// const UserListItem = ()

export default App