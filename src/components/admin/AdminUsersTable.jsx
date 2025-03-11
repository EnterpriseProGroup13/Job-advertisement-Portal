import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminUsersTable = () => {
    const { users } = useSelector(store => store.admin); // Ensure users are stored in Redux
    const [filteredUsers, setFilteredUsers] = useState(users);
    const navigate = useNavigate();

    useEffect(() => {
        setFilteredUsers(users); // Update list when users change
    }, [users]);

    return (
        <div>
            <h2 className="text-xl font-bold mt-6 mb-4">User Management</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredUsers?.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell className="text-right">
                                <Button onClick={() => navigate(`/admin/users/edit/${user.id}`)}>Edit</Button>
                                <Button variant="destructive" className="ml-2">Suspend</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminUsersTable;
