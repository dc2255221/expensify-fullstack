// store action creators for expenses
import database from '../firebase/firebase';
import axios from 'axios';

// ADD_EXPENSE Action Creator
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    console.log('startAddExpense is called')
    return (dispatch, getState) => {
        const uid = getState().auth.user.uid;
        const { description = '', note = '', amount = 0, category='uncategorized', createdAt = 0 } = expenseData;
        const expense = { description, note, amount, category, createdAt };
        
        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        })
        // let res = await axios.post('/expenses', expense);
        // dispatch(addExpense({
        //     id: res.id,
        //     ...expense
        // }));
    };
};

// REMOVE_EXPENSE Action Creator
export const removeExpense = ({ id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({ id }) => {
    return (dispatch, getState) => {
        const uid = getState().auth.user.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(()=> {
            dispatch(removeExpense({ id }));
        });
    }
};

// EDIT_EXPENSE Action Creator
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.user.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates));
        });
    }
}

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.user.uid;
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
            const expenses = [];
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            console.log(expenses);
            dispatch(setExpenses(expenses));
        });
    };
};
