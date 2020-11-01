import React from 'react';
import { Container,Item,Inner,Pane,Title,SubTitle,Image } from './styles/jumbotron';

 
const jumbotron = ({ children,direction = 'row', ...restProps}) => {
 return (
    <Item {...restProps}>
        <Inner direction={direction}>
            {children}
        </Inner>
    </Item>
    );
};
 
jumbotron.Container = ({children,...restProps}) => {
    return <Container {...restProps}>{children}</Container>;
}

jumbotron.Pane = ({children,...restProps}) => {
    return <Pane {...restProps}>{children}</Pane>;
}

jumbotron.Title = ({children,...restProps}) => {
    return <Title {...restProps}>{children}</Title>;
}

jumbotron.SubTitle = ({children,...restProps}) => {
    return <SubTitle {...restProps}>{children}</SubTitle>;
}

jumbotron.Image = ({...restProps}) => {
    return <Image {...restProps} />;
}

export default jumbotron;