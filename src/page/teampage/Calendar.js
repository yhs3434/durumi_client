import React, {Component} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { ArrowBackIos, ArrowForwardIos, ChevronLeft, ChevronRight } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

class Calendar extends Component {
    state = {
        date: 0,
        month: 0,
        year: 0,
        day: -1,
        firstDay: -1,
        sumDay: 0,
        newDay: 0,
        thisMonth: {
            firstDay: -1
        },
        popperAnchorEl: null
    }

    initToday = async () => {
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const todayObj = new Date();

        const gap = todayObj.getDate() - 1;
        const firstDayBefore = todayObj.getDay() - gap;
        const firstDay = ((firstDayBefore%7)+7)%7;

        await this.setState({
            date: todayObj.getDate(),
            month: todayObj.getMonth() + 1,
            year: todayObj.getFullYear(),
            day: todayObj.getDay(),
            newDay: todayObj.getDate(),
            firstDay: firstDay,
            sumDay: 0,
            thisMonth: {
                firstDay: firstDay
            },
            today: {
                date: todayObj.getDate(),
                month: todayObj.getMonth() + 1,
                year: todayObj.getFullYear(),
            }
        })
    }

    xDaysInMonth = (y, m) => {
        if (m===1||m===3||m===5||m===7||m===8||m===10||m===12){
            return 31;
        } else {
            if(m===2) {
                if(y%4===0) {
                    if(y%100){
                        if(y%400){
                            return 29;
                        } else {
                            return 28;
                        }
                    } else {
                        return 29;
                    }
                } else {
                    return 28;
                }
            } else {
                return 30;
            }
        }
    }

    handleArrowRightClick = () => {
        let newSumDay = this.state.sumDay + this.xDaysInMonth(this.state.year, this.state.month);

        const firstDayBefore = this.state.thisMonth.firstDay + newSumDay;
        const firstDay = ((firstDayBefore%7)+7)%7;

        if (this.state.month < 12)  {
            this.setState({
                sumDay: newSumDay,
                month: this.state.month + 1,
                firstDay: firstDay
            })
        } else {
            this.setState({
                sumDay: newSumDay,
                month: 1,
                year: this.state.year + 1,
                firstDay: firstDay
            })
        }
    }

    handleArrowLeftClick = () => {
        let newMonth = this.state.month;
        let newYear = this.state.year;
        if(this.state.month>1){
            newMonth = this.state.month - 1;
            newYear = this.state.year;
        } else {
            newMonth = 12;
            newYear = this.state.year - 1;
        }
        let newSumDay = this.state.sumDay - this.xDaysInMonth(newYear, newMonth);

        const firstDayBefore = this.state.thisMonth.firstDay + newSumDay;
        const firstDay = ((firstDayBefore%7)+7)%7;

        if (this.state.month > 1) {
            this.setState({
                sumDay: newSumDay,
                month: this.state.month - 1,
                firstDay: firstDay
            })
        } else {
            this.setState({
                sumDay: newSumDay,
                month: 12,
                year: this.state.year - 1,
                firstDay: firstDay
            })
        }
    }

    handleChevronRightClick = () => {
        let newSumDay = this.state.sumDay;
        
        let newYear = this.state.year;
        let newMonth = this.state.month;
        
        for (let i=0; i<12; i++) {
            newSumDay += this.xDaysInMonth(newYear, newMonth);
            if (newMonth < 12) {
                newMonth += 1;
            } else {
                newMonth = 1;
                newYear += 1;
            }
        }

        const firstDayBefore = this.state.thisMonth.firstDay + newSumDay;
        const firstDay = ((firstDayBefore%7)+7)%7;

        this.setState({
            sumDay: newSumDay,
            month: newMonth,
            year: newYear,
            firstDay: firstDay
        })
    }

    handleChevronLeftClick = () => {
        let newSumDay = this.state.sumDay;
        
        let newYear = this.state.year;
        let newMonth = this.state.month;
        
        for (let i=0; i<12; i++) {   
            if (newMonth > 1) {
                newMonth -= 1;
            } else {
                newMonth = 12;
                newYear -= 1;
            }
            newSumDay -= this.xDaysInMonth(newYear, newMonth);
        }

        const firstDayBefore = this.state.thisMonth.firstDay + newSumDay;
        const firstDay = ((firstDayBefore%7)+7)%7;

        this.setState({
            sumDay: newSumDay,
            month: newMonth,
            year: newYear,
            firstDay: firstDay
        })
    }

    handlePopperClicked = (event) => {
        this.setState({
            popperAnchorEl: this.state.popperAnchorEl ? null : event.currentTarget
        })
    }

    componentWillMount() {
        this.initToday();
    }

    componentDidMount() {
        this.componentDidUpdate();
        /*
        let month_elem = document.getElementById('month');
        month_elem.innerHTML = '' + this.state.month + '월';
        let year_elem = document.getElementById('year');
        year_elem.innerHTML = '' + this.state.year;

        let cellId = '';
        let length = this.xDaysInMonth(this.state.year, this.state.month);

        for(let i=0; i<length; i++){
            cellId = 'cell_' + (this.state.firstDay + i);
            let cell = document.getElementById(cellId);
            cell.innerHTML = '' + (i+1);
        }
        const todayCellId = 'cell_'+this.state.date;
        const todayCell = document.getElementById(todayCellId);
        todayCell.setAttribute('style', "font-size: xx-large;");
        */
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState !== this.state){
            let month_elem = document.getElementById('month');
            month_elem.innerHTML = '' + this.state.month + '월';
            let year_elem = document.getElementById('year');
            year_elem.innerHTML = '' + this.state.year;

            for(let i=0; i<42; i++){
                let cell = document.getElementById('cell_'+i);
                cell.innerText = '';
                cell.setAttribute('style', "");
            }

            let cellId = '';
            let length = this.xDaysInMonth(this.state.year, this.state.month);
            for(let i=0; i<length; i++){
                cellId = 'cell_' + (this.state.firstDay + i);
                let cell = document.getElementById(cellId);
                cell.innerHTML = '' + (i+1);
                // let newHTML = `<button class="MuiButtonBase-root MuiButton-root MuiButton-text" tabindex="0" type="button"><span class="MuiButton-label">${i+1}</span><span class="MuiTouchRipple-root"></span></button>`;
                // cell.innerHTML = newHTML;
            }
            
            if((document.getElementById('cell_35')).innerHTML === '') {
                let rows = document.getElementsByClassName('MuiTableRow-root');
                let lastRow = rows[rows.length - 1];
                for (let i=0; i<lastRow.children.length; i++) {
                    lastRow.children[i].style.display = "none";
                }
            }
        }
    }

    render() {
        const style = {
            month: {
                margin: '1rem',
                fontSize: 'xx-large'
            },
            arrowField: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }
        }
        return(
            <div>
                <div style={style.arrowField}>
                    <Button onClick={this.handleChevronLeftClick}><ChevronLeft /></Button>
                    <Typography id='year'></Typography>
                    <Button onClick={this.handleChevronRightClick}><ChevronRight /></Button>
                </div>
                <div style={style.arrowField}>
                    <Button onClick={this.handleArrowLeftClick}><ArrowBackIos /></Button>
                    <Typography style={style.month} id='month'></Typography>
                    <Button onClick={this.handleArrowRightClick}><ArrowForwardIos /></Button>
                </div>
                <div>
                    <Popper open={Boolean(this.state.popperAnchorEl)}
                        anchorEl={this.state.popperAnchorEl} transition>
                            {({TransitionProps}) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Paper>
                                        <div>
                                            <table>
                                                <thead></thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>2</td>
                                                        <td>3</td>
                                                        <td>4</td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>6</td>
                                                        <td>7</td>
                                                        <td>8</td>
                                                    </tr>
                                                    <tr>
                                                        <td>9</td>
                                                        <td>10</td>
                                                        <td>11</td>
                                                        <td>12</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Paper>
                                </Fade>
                            )}
                        </Popper>
                </div>

                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>일</TableCell>
                                <TableCell align='center'>월</TableCell>
                                <TableCell align='center'>화</TableCell>
                                <TableCell align='center'>수</TableCell>
                                <TableCell align='center'>목</TableCell>
                                <TableCell align='center'>금</TableCell>
                                <TableCell align='center'>토</TableCell>       
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell id={'cell_0'} align='center'></TableCell>
                                <TableCell id={'cell_1'} align='center'></TableCell>
                                <TableCell id={'cell_2'} align='center'></TableCell>
                                <TableCell id={'cell_3'} align='center'></TableCell>
                                <TableCell id={'cell_4'} align='center'></TableCell>
                                <TableCell id={'cell_5'} align='center'></TableCell>
                                <TableCell id={'cell_6'} align='center'></TableCell>
                                
                            </TableRow>
                            <TableRow>
                                <TableCell id={'cell_7'} align='center'></TableCell>
                                <TableCell id={'cell_8'} align='center'></TableCell>
                                <TableCell id={'cell_9'} align='center'></TableCell>
                                <TableCell id={'cell_10'} align='center'></TableCell>
                                <TableCell id={'cell_11'} align='center'></TableCell>
                                <TableCell id={'cell_12'} align='center'></TableCell>
                                <TableCell id={'cell_13'} align='center'></TableCell>
                                
                            </TableRow>
                            <TableRow>
                                <TableCell id={'cell_14'} align='center'></TableCell>
                                <TableCell id={'cell_15'} align='center'></TableCell>
                                <TableCell id={'cell_16'} align='center'></TableCell>
                                <TableCell id={'cell_17'} align='center'></TableCell>
                                <TableCell id={'cell_18'} align='center'></TableCell>
                                <TableCell id={'cell_19'} align='center'></TableCell>
                                <TableCell id={'cell_20'} align='center'></TableCell>
                                
                            </TableRow>
                            <TableRow>
                                <TableCell id={'cell_21'} align='center'></TableCell>
                                <TableCell id={'cell_22'} align='center'></TableCell>
                                <TableCell id={'cell_23'} align='center'></TableCell>
                                <TableCell id={'cell_24'} align='center'></TableCell>
                                <TableCell id={'cell_25'} align='center'></TableCell>
                                <TableCell id={'cell_26'} align='center'></TableCell>
                                <TableCell id={'cell_27'} align='center'></TableCell>
                                
                            </TableRow>
                            <TableRow>
                                <TableCell id={'cell_28'} align='center'></TableCell>
                                <TableCell id={'cell_29'} align='center'></TableCell>
                                <TableCell id={'cell_30'} align='center'></TableCell>
                                <TableCell id={'cell_31'} align='center'></TableCell>
                                <TableCell id={'cell_32'} align='center'></TableCell>
                                <TableCell id={'cell_33'} align='center'></TableCell>
                                <TableCell id={'cell_34'} align='center'></TableCell>
                                
                            </TableRow>
                            <TableRow>
                                <TableCell id={'cell_35'} align='center'></TableCell>
                                <TableCell id={'cell_36'} align='center'></TableCell>
                                <TableCell id={'cell_37'} align='center'></TableCell>
                                <TableCell id={'cell_38'} align='center'></TableCell>
                                <TableCell id={'cell_39'} align='center'></TableCell>
                                <TableCell id={'cell_40'} align='center'></TableCell>
                                <TableCell id={'cell_41'} align='center'></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default Calendar;