import React from 'react';
import { connect } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import { ContentContainer, InputGroup, InputGroupItem, StyledInput, StyledSelect } from '../styles/ExpenseListFilters';

export class ExpenseListFilters extends React.Component {
    state = {
        startDateId: uuidv1(),
        endDateId: uuidv1(),
        calendarFocused: null, // can be null, 'startDate', or 'endDate'
    };
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    };
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };
    onSortChange = (e) => {
        if (e.target.value === 'date') {
            this.props.sortByDate();
        } else if (e.target.value === 'amount') {
            this.props.sortByAmount();
        } 
    };
    render() {
        return (
            <ContentContainer>
                <InputGroup>
                    <InputGroupItem>
                        <StyledInput
                            type="text" 
                            placeholder= " Search expenses"
                            value={this.props.filters.text} 
                            onChange={this.onTextChange}
                        />
                    </InputGroupItem>
                    <InputGroupItem>
                        <StyledSelect 
                            value={this.props.filters.sortBy} 
                            onChange={this.onSortChange}
                        >
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </StyledSelect>
                    </InputGroupItem>
                    <InputGroupItem>
                        <DateRangePicker
                            startDateId={'start-date-input'}
                            endDateId={'end-date-input'}
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            showClearDates={true}
                        />
                    </InputGroupItem>
                </InputGroup>
            </ContentContainer>
        )
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch, props) => ({
    setStartDate: (startDate) => dispatch( setStartDate( startDate )),
    setEndDate: (endDate) => dispatch( setEndDate( endDate )),
    setTextFilter: (text) => dispatch( setTextFilter( text )),
    sortByDate: () => dispatch( sortByDate()),
    sortByAmount: () => dispatch( sortByAmount())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);