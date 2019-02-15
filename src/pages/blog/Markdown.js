
import React from 'react'

import { Row, Col, Icon } from 'antd'

import './markdown.css'


class Markdown extends React.Component {



        render() {
                return (
                        <Row>
                                <Row className='markdown-tool'>
                                        <Icon type="bold" />
                                        <Icon type="italic" />
                                        <Icon type="underline" />
                                </Row>

                                <Row className='markdown-content'>
                                        <Col span={12} className='content-left'>
                                                <TextArea autosize={{ minRows: 8, maxRows: 30 }} />
                                        </Col>
                                        <Col span={12} className='content-right'></Col>
                                </Row>
                        </Row>
                )
        }

}


export default Markdown