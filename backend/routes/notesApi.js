const fs = require('fs');
const usersData = JSON.parse(fs.readFileSync('users.json', 'utf-8'));


app.get('/users', (req, res) => {
    res.send(usersData.users);
});


app.post('/users', (req, res) => {
    const newUser = { id: usersData.users.length + 1, name: req.body.name };
    usersData.users.push(newUser);
    fs.writeFileSync('users.json', JSON.stringify(usersData));
    res.send('User added successfully');
});


app.put('/users/:id', (req, res) => {
    const userToUpdate = usersData.users.find(user => user.id === parseInt(req.params.id));
    userToUpdate.name = req.body.name;
    fs.writeFileSync('users.json', JSON.stringify(usersData));
    res.send('User updated successfully');
});


app.delete('/users/:id', (req, res) => {
    const indexToRemove = usersData.users.findIndex(user => user.id === parseInt(req.params.id));
    usersData.users.splice(indexToRemove, 1);
    fs.writeFileSync('users.json', JSON.stringify(usersData));
    res.send('User deleted successfully');
  });
  