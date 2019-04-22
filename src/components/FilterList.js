import React from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

const styles = {
  checkbox: {
    padding: 0,
  },
};

const FilterList = props => {
  const { classes, type, data, handleToggle, handleCollapse, open, state } = props;
  return (
    <List>
      <ListItem button onClick={handleCollapse(type)}>
        <ListItemText primary={type.charAt(0).toUpperCase() + type.slice(1)} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {data.map(item => (
          <ListItem
            key={item.id}
            role={undefined}
            dense={true}
            button
            onClick={handleToggle(type, item.id)}
          >
            <Checkbox
              className={classes.checkbox}
              checked={!!state[item.id]}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={item.value} />
          </ListItem>
        ))}
      </Collapse>
    </List>
  );
};

export default withStyles(styles)(observer(FilterList));
