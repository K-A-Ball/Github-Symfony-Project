import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function UserInformationTable() {
  const classes = useStyles();
  const [user_to_search, setUserToSearch] = useState("")
  const [user_data, setUserData] = useState([])
  const [cached_searches, setCachedSearches] = useState([])
  const keys_to_display = ["login", "name", "public_repos", "followers", "following", "updated_at"]

  const handleSearch = (user_string) => {
    const previous_search_data = cached_searches.filter(search_dict => Object.keys(search_dict).includes(user_string))
    previous_search_data.length > 0 ? setUserData(previous_search_data[0][user_string]) : getUserDataFromApi(user_string)
  }

  const getUserDataFromApi = (user_string) => {
    axios.get(`/profiles/${user_string}`).then(response => {
      const filtered_user_data = Object.entries(response.data).filter(([key, value]) => keys_to_display.includes(key))
      setUserData(filtered_user_data)
      const user_dict = {}
      user_dict[user_string] = filtered_user_data;
      setCachedSearches([...cached_searches, user_dict])
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div>
      <input onChange={(e) => setUserToSearch(e.target.value)} />
      <button onClick={(e) => handleSearch(user_to_search)}> Search </button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {keys_to_display.map(key =>
                <TableCell key={key}>
                  {key}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {user_data.map(([key, value]) =>
                <TableCell key={`${key}: ${value}`}>
                  {value === null ? "Not supplied by user" : value}
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
