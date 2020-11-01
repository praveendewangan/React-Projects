import React from 'react';
import { Accordian } from '../components';
import faqData from '../fixtures/faqs.json';

export function FaqContainer() {
    return (
        <Accordian>
            <Accordian.Title>Frequently Asked Questions</Accordian.Title>
            {faqData.map(item => 
                <Accordian.Item keys={item.id}>
                    <Accordian.Header>{item.header}</Accordian.Header>
                    <Accordian.Body>{item.body}</Accordian.Body>
                </Accordian.Item>
            )}
            <Accordian.Item></Accordian.Item>
        </Accordian>
    )
}
