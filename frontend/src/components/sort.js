import React from 'react';

const Sort = ({children, by}) => {
    var type;
    var desc=false;
    if(by==='') type='id';
    else if(by==='pricel2h') type='price';
    else if(by==='priceh2l') {type='price'; desc=true;}
    else if(by==='titlea2z') type='name';
    else if(by==='titlez2a') {type='name'; desc=true;}

    if(desc)
        return React.Children.toArray(children).sort((a, b) => {
            return (a.props.courseInfo[type] < b.props.courseInfo[type]) ? 1 : -1;
        });
    return React.Children.toArray(children).sort((a, b) => {
        return (a.props.courseInfo[type] > b.props.courseInfo[type]) ? 1 : -1;
    });  
}

export default Sort;