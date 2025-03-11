import React from 'react';

const ReportsAnalytics = () => {
    return (
        <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Reports & Analytics</h2>
            <div className="grid grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg shadow-md">
                    <h3 className="text-lg font-bold">Total Users</h3>
                    <p className="text-2xl text-blue-600">1,250</p>
                </div>
                <div className="p-4 border rounded-lg shadow-md">
                    <h3 className="text-lg font-bold">Active Jobs</h3>
                    <p className="text-2xl text-green-600">320</p>
                </div>
                <div className="p-4 border rounded-lg shadow-md">
                    <h3 className="text-lg font-bold">Applications</h3>
                    <p className="text-2xl text-orange-600">5,430</p>
                </div>
            </div>
        </div>
    );
};

export default ReportsAnalytics;
