import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Student {
    id: string;
    name: string;
    username: string;
    password: string;
}

interface StudentContextType {
    student: Student;
    updateStudent: (data: Partial<Student>) => void;
    logout: () => void;
}

const StudentContext = createContext<StudentContextType | null>(null);

export const useStudent = (): StudentContextType => {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error('useStudent must be used within a StudentProvider');
    }
    return context;
};

interface StudentProviderProps {
    children: ReactNode;
}

export const StudentProvider: React.FC<StudentProviderProps> = ({ children }) => {
    const [student, setStudent] = useState<Student>(() => {
        const savedStudent = localStorage.getItem('student');
        return savedStudent
            ? JSON.parse(savedStudent)
            : {
                  id: '',
                  name: '',
                  username: '',
                  password: '',
              };
    });

    useEffect(() => {
        localStorage.setItem('student', JSON.stringify(student));
    }, [student]);

    const updateStudent = (data: Partial<Student>) => {
        setStudent((prev) => ({ ...prev, ...data }));
    };

    const logout = () => {
        setStudent({
            id: '',
            name: '',
            username: '',
            password: '',
        });
        localStorage.removeItem('student');
    };

    return (
        <StudentContext.Provider value={{ student, updateStudent, logout }}>
            {children}
        </StudentContext.Provider>
    );
};
