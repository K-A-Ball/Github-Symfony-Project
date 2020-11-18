import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function UserInformationTable() {
  const classes = useStyles();
  const [user_to_search, setUserToSearch] = useState("");
  const [user_data, setUserData] = useState([]);
  const [cached_searches, setCachedSearches] = useState([]);
  const [updated_profile_time, setUpdatedProfileTime] = useState("")
  const [invalid_searches, setInvalidSearches] = useState([]);
  const [invalid_search, setInvalidSearch] = useState(false);
  const keys_to_display = ["login", "name", "public_repos", "followers", "following"]

  const handleSearch = (user_string, e) => {
    e.preventDefault();
    const previous_search_data = cached_searches.filter(search_dict => Object.keys(search_dict).includes(user_string))
    previous_search_data.length > 0 ? setDataFromCache(previous_search_data, user_string) : getUserDataFromApi(user_string)
  }

  const setDataFromCache = (previous_search_data, user_string) => {
    const user_info = previous_search_data[0][user_string];
    setUserData(Object.entries(user_info).filter(([key, value]) => keys_to_display.includes(key)))
    findAndSetUpdatedProfileTime(user_info)
  }

  const findAndSetUpdatedProfileTime = (user_info) => {
    const [_, updated_profile_time] = Object.entries(user_info).filter(([key, value]) => key === "updated_at").flat()
    setUpdatedProfileTime(updated_profile_time)
  }


  const cacheUserData = (user_info, user_string) => {
    const user_dict = {}
    user_dict[user_string] = user_info;
    setCachedSearches([...cached_searches, user_dict])
  }

  const setDataToDisplayAndCache = (user_info, user_string) => {
    const filtered_user_data = Object.entries(user_info).filter(([key, value]) => keys_to_display.includes(key))
    findAndSetUpdatedProfileTime(user_info)
    setUserData(filtered_user_data)
    cacheUserData(user_info, user_string)
  }

  const setSearchAsInvalidAndCache = (username) => {
    setInvalidSearch(true);
    setInvalidSearches([...invalid_searches, username])
  }

  const getUserDataFromApi = (user_string) => {
    if (invalid_searches.includes(user_string)) {
      setInvalidSearch(true)
    } else {
      axios.get(`/profile/${user_string}`).then(response => {
        response.data.message === "Not Found" ? setSearchAsInvalidAndCache(user_string) : setDataToDisplayAndCache(response.data, user_string)
      }).catch(error => {
        console.log(error)
      })
    }
  }

  const handleSearchInput = (e) => {
    !invalid_searches.includes(e.target.value) ? setInvalidSearch(false) : null;
    setUserToSearch(e.target.value)
  }

  const calculateWhenProfileLastUpdated = (last_updated_time) => {
    if (last_updated_time !== "") {
      const current_time = new Date()
      const difference = current_time - new Date(last_updated_time)
      return Math.floor(difference / 86400000);
    }
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className="user_search_row">
              <TableCell style={{ display: "inline-flex" }}>
                <form key="user_search_form" onSubmit={(e) => handleSearch(user_to_search, e)}>
                  <TextField onChange={(e) => handleSearchInput(e)} error={invalid_search}
                    label={invalid_search ? "User not found" : "Search for a user"} />
                </form>
                <button onClick={(e) => handleSearch(user_to_search, e)}> Search </button>
              </TableCell>
            </TableRow>
            <TableRow>
              {keys_to_display.map(key =>
                <TableCell key={key}>
                  {key}
                </TableCell>
              )}
              <TableCell>
                Days since last profile update
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {user_data.map(([key, value]) =>
                <TableCell key={`${key}: ${value}`}>
                  {value === null ? "Not supplied by user" : value}
                </TableCell>
              )}
              <TableCell>
                {calculateWhenProfileLastUpdated(updated_profile_time)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
