import './App.css';
import { useState, useEffect } from 'react';
import { Data } from './EmployeData';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(Data);
    console.log(Data);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    let error = [];
    if (firstName === '') error.push('First name is required');
    if (lastName === '') error.push('Last name is required');
    if (age <= 0) error.push('Age must be greater than 0');

    if (error.length === 0) {
      const newObject = {
        id: update ? id : data.length + 1,
        firstName: firstName,
        lastName: lastName,
        age: parseInt(age),
      };

      if (update) {
        // Update record
        const updatedData = data.map((item) =>
          item.id === id ? newObject : item
        );
        setData(updatedData);
        alert('Record Updated');
      } else {
        // Save new record
        setData([...data, newObject]);
        alert('Record Saved');
      }

      // Reset form
      setFirstName('');
      setLastName('');
      setAge(0);
      setUpdate(false);
      setId(0);
    } else {
      alert(`Error:\n${error.join('\n')}`);
    }
  };

  const handleEdit = (id) => {
    const recordToEdit = data.find((item) => item.id === id);
    setFirstName(recordToEdit.firstName);
    setLastName(recordToEdit.lastName);
    setAge(recordToEdit.age);
    setId(id);
    setUpdate(true);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    alert('Record Deleted');
  };

  return (
    <div className="App">
      <div>
        <label>
          First Name
          <input
            type="text"
            placeholder="Enter your first name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name
          <input
            type="text"
            placeholder="Enter your last name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </label>
      </div>
      <div>
        <label>
          Age
          <input
            type="number"
            placeholder="Enter your age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
        </label>
      </div>
      <div>
        <button className="btn btn-success" onClick={handleSave}>
          {update ? 'Update' : 'Save'}
        </button>
      </div>

      <table className="table table-striped table-hover mt-3">
        <thead>
          <tr>
            <td>Sr. No</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {/* Show data */}
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
