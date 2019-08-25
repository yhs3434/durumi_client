import React, {Component} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { ArrowBackIos, ArrowForwardIos, ChevronLeft, ChevronRight } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';
import DoneIcon from '@material-ui/icons/Done';
import {Menu, MenuItem} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import axios from 'axios';

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
        popperAnchorEl: null,
        selected: null,
        addSchedule: null,
        newSchedule: {
            what: '',
            when: new Date(),
            where: ''
        },
        schedule: [],
        schedules: {
            init: true
        },
        listItemAnchor: null,
        scheduleSelectedId: ''
    }

    initToday = async () => {
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const todayObj = new Date();

        const gap = todayObj.getDate() - 1;
        const firstDayBefore = todayObj.getDay() - gap;
        const firstDay = ((firstDayBefore%7)+7)%7;

        this.setState({
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

    handleAddScheduleSubmitClicked = () => {
        const hourBefore = this.state.newSchedule.when.getHours();
        let hour = '';
        if (hourBefore > 12) {
            hour = `PM ${hourBefore-12}`;
        } else {
            hour = `AM ${hourBefore}`;
        }
        const minute = this.state.newSchedule.when.getMinutes();

        let newWhen = `${hour}:${minute}`
        let newSchedule = {
            what: this.state.newSchedule.what,
            when: newWhen,
            where: this.state.newSchedule.where
        };

        const newScheduleDate = `${this.state.selected.year}-${this.state.selected.month}-${this.state.selected.date}`;

        Boolean(this.state.schedules[newScheduleDate])
        ?
        this.setState({
            schedules: {
                ...this.state.schedules,
                [newScheduleDate]: [...this.state.schedules[newScheduleDate], newSchedule]
            }
        })
        :
        this.setState({
            schedules: {
                ...this.state.schedules,
                [newScheduleDate]: [newSchedule]
            }
        })

        newSchedule.newScheduleDate = newScheduleDate;

        if(Boolean(this.props.teamSelected)) {
            axios.post(`${process.env.REACT_APP_SERVER_URI}/team/calendar/${this.props.teamSelected}`, newSchedule).then((result) => {console.log(result)});
        }

        this.setState({
            newSchedule: {
                when: new Date()
            },
        });
        this.handleAddScheduleClicked();
    }

    handleAddScheduleChange = (name) => (event) => {
        this.setState({
            newSchedule: {
                ...this.state.newSchedule,
                [name]: event.target.value
            }
        });
    }

    handleTimeChange = (time) => {
        this.setState({
            newSchedule: {
                ...this.state.newSchedule,
                when: time
            }
        })
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

    handleCellClick = (event) => {
        const targetId = event.currentTarget.id;
        const daySelected = targetId.split('_')[1];
        const monthSelected = this.state.month;
        const yearSelected = this.state.year;
        
        this.setState({
            selected: {
                year: yearSelected,
                month: monthSelected,
                date: daySelected
            }
        });
    }

    handleListItemClick = (event) => {
        this.setState({
            listItemAnchor: event.currentTarget,
            scheduleSelectedId: event.currentTarget.id
        })
    }

    handleListItemClose = () => {
        this.setState({
            listItemAnchor: null
        })
    }

    handleListItemRemoveClick = (event) => {
        const listItemId = parseInt(this.state.scheduleSelectedId.split('_')[1]);
        let selectedDay = '';
        if (Boolean(this.state.selected)) {
            selectedDay = `${this.state.selected.year}-${this.state.selected.month}-${this.state.selected.date}`;
        }

        const schedulesLength = this.state.schedules[selectedDay].length;
        this.setState({
            schedules: {
                ...this.state.schedules,
                [selectedDay]: [...this.state.schedules[selectedDay].slice(0, listItemId), ...this.state.schedules[selectedDay].slice(listItemId+1, schedulesLength)]
            }
        });
    }

    handleModalClose = () => {
        this.setState({
            selected: null
        })
    }

    handleAddScheduleClicked = () => {
        if (Boolean(this.state.addSchedule)) {
            this.setState({
                addSchedule: null
            });
        } else {
            this.setState({
                addSchedule: true
            })
        }
    }

    componentWillMount() {
        this.initToday();
    }

    componentDidMount() {
        if(Boolean(this.props.teamSelected)) {
            axios.get(`${process.env.REACT_APP_SERVER_URI}/team/calendar/${this.props.teamSelected}`).then((result) => {
                for (let i=0; i<result.data.length; i++){
                    const newScheduleDate = result.data[i].newScheduleDate;
                    let newSchedule = {};
                    newSchedule.what = result.data[i].what;
                    newSchedule.when = result.data[i].when;
                    newSchedule.where = result.data[i].where;

                    Boolean(this.state.schedules[newScheduleDate])
                    ?
                    this.setState({
                        schedules: {
                            ...this.state.schedules,
                            [newScheduleDate]: [...this.state.schedules[newScheduleDate], newSchedule]
                        }
                    })
                    :
                    this.setState({
                        schedules: {
                            ...this.state.schedules,
                            [newScheduleDate]: [newSchedule]
                        }
                    })
                }
                
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
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
            },
            arrowField2: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
            },
            headCell:{
                paddingLeft: '1rem',
                paddingRight: '1rem'
            },
            cell: {
                paddingTop: '2.5rem',
                paddingBottom: '2.5rem',
                paddingLeft: '0.1rem',
                paddingRight: '0.1rem',
                fontSize: '1.3em'
            },
            modalRoot: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            },
            modalPaper: {
                display: 'flex',
                flexDirection: 'column',
                width: "60%",
                maxHeight: "95%",
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem'
            },
            modalTypographyContainer: {
                display: 'inline-flex',
                flexDirection: 'row',
                width: '80%',
                flexGrow: 1,
                alignItems: 'center'
            },
            modalListContainer: {
                display: 'inline-flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                flexGrow: 4,
                justifyContent: 'center',
                overflow: 'auto'
            },
            modalPortalContainer: {
                flexGrow: 1,
                width: '80%',
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: 'thin solid #50fbf3',
                marginTop: '1rem',
                marginBottom: '1rem',
                padding: '1rem'
            },
            modalScheduleList: {
                flexWrap: 'wrap'
            },
            textField: {
                width: "90%"
            }
        }

        let items = [];
        let rows = 0;
        for(let i=0; i<this.state.firstDay; i++) {
            items.push(<TableCell style={style.cell}></TableCell>);
        }
        for(let i=0;i<this.xDaysInMonth(this.state.year, this.state.month);i++) {
            if (i%7 === (6-this.state.firstDay)) {
                rows += 1;
            }
            items.push(<TableCell align="center" style={style.cell}>
                {(this.state.year === new Date().getFullYear() && this.state.month === (new Date().getMonth()+1) && (i+1) === (new Date().getDate()))
                ?
                    <Button id={`today_${i+1}`} style={{backgroundColor: 'red'}} onClick={this.handleCellClick}>{i+1}</Button>
                :
                    <Button id={`day_${i+1}`} onClick={this.handleCellClick}>{i+1}</Button>
                }
            </TableCell>);
        }
        let itemsRow = [];
        for (let i=0;i<=rows;i++){
            itemsRow.push(items.slice(7*i, 7*(i+1)));
        }

        let selectedDay = '';
        if (Boolean(this.state.selected)) {
            selectedDay = `${this.state.selected.year}-${this.state.selected.month}-${this.state.selected.date}`;
        }

        return(
            <div>
                <div style={style.arrowField}>
                    <Button onClick={this.handleChevronLeftClick}><ChevronLeft /></Button>
                    <Typography id='year'>{`${this.state.year}`}</Typography>
                    <Button onClick={this.handleChevronRightClick}><ChevronRight /></Button>
                </div>
                <div style={style.arrowField2}>
                    <Button onClick={this.handleArrowLeftClick}><ArrowBackIos /></Button>
                    <Typography style={style.month} id='month'>{`${this.state.month} 월`}</Typography>
                    <Button onClick={this.handleArrowRightClick}><ArrowForwardIos /></Button>
                </div>

                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={style.headCell} align='center'>일</TableCell>
                                    <TableCell style={style.headCell} align='center'>월</TableCell>
                                    <TableCell style={style.headCell} align='center'>화</TableCell>
                                    <TableCell style={style.headCell} align='center'>수</TableCell>
                                    <TableCell style={style.headCell} align='center'>목</TableCell>
                                    <TableCell style={style.headCell} align='center'>금</TableCell>
                                    <TableCell style={style.headCell} align='center'>토</TableCell>       
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {itemsRow.map((item, idx) => {
                                    return (
                                        <TableRow>
                                            {item}
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>

                <div>
                    <Modal style={style.modalRoot} onClose={this.handleModalClose} open={Boolean(this.state.selected)}>
                        {
                            Boolean(this.state.selected)
                            ?
                            <Paper style={style.modalPaper}>
                                <div style={style.modalTypographyContainer}>
                                    <Typography>{selectedDay}</Typography>
                                    <Button onClick={this.handleAddScheduleClicked} variant="contained" color="primary" style={{marginLeft: 'auto'}}>Add</Button>
                                </div>
                                {
                                    Boolean(this.state.addSchedule)
                                    ?
                                    <div style={style.modalPortalContainer}>
                                        <TextField
                                            label="what"
                                            onChange={this.handleAddScheduleChange('what')}
                                            value={this.state.newSchedule.what}
                                            style={style.textField}
                                        />
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardTimePicker
                                                margin="normal"
                                                id="mui-pickers-time"
                                                label="when"
                                                onChange={this.handleTimeChange}
                                                value={this.state.newSchedule.when}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                                style={style.textField}
                                            />
                                        </MuiPickersUtilsProvider>
                                        <TextField
                                            label="where"
                                            onChange={this.handleAddScheduleChange('where')}
                                            value={this.state.newSchedule.where}
                                            style={style.textField}
                                        />
                                        <Button 
                                            variant="contained" 
                                            style={{marginTop: '1rem'}}
                                            onClick={this.handleAddScheduleSubmitClicked}
                                        >Add</Button>
                                    </div>
                                    :
                                    ""
                                }
                                <div style={style.modalListContainer}>
                                    <List style={style.modalScheduleList}>
                                        
                                        {
                                            Boolean(this.state.schedules)
                                            ?
                                            (
                                                Boolean(this.state.schedules[selectedDay])
                                                ?
                                                this.state.schedules[selectedDay].map((item, idx) => (
                                                    <ListItem id={`schedule_${idx}`} button onClick={this.handleListItemClick} key={idx}>
                                                        <ListItemIcon><DoneIcon /></ListItemIcon>
                                                        <ListItemText primary={item.what}/>
                                                        <ListItemText primary={item.when.toString()}/>
                                                    </ListItem>
                                                ))
                                                :
                                                ''
                                            )
                                            :
                                            ''
                                        }
                                    </List>
                                </div>
                                <div>
                                    <Menu
                                        anchorEl={this.state.listItemAnchor}
                                        keepMounted
                                        open={Boolean(this.state.listItemAnchor)}
                                        onClose={this.handleListItemClose}
                                        
                                        getContentAnchorEl={null}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'center',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <MenuItem button onClick={this.handleListItemRemoveClick}>
                                            <ListItemIcon>
                                                <RemoveIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary="remove"/>
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </Paper>
                            :
                            ""
                        }
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Calendar;