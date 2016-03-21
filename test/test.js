import expect from 'expect'
import * as actions from '../js/actions'

describe('actions', () => {
  it('should create an action to craete record', () => {
    const record = {
    	date: new Date(),
    	marchant: 'coffetest'
    };

    const expectedAction = {
      type: actions.RECORD_CREATED,
      record: record
    }

    expect(actions.recordCreated(record)).toEqual(expectedAction)
  })
})

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import EditRecord from '../js/components/EditRecord.jsx'

function setup() {
  let props = {
    onSave: expect.createSpy()
  }

  let renderer = TestUtils.createRenderer()

  renderer.render(<EditRecord {...props} />);

  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('components', () => {
  describe('EditRecord', () => {
    it('should not call createRecord if data is not filled', () => {
      const { output, props } = setup();

      console.log(output);

      let saveButton = output.props.children[4].props.children[0];
      saveButton.props.onClick();

      expect(props.onSave.calls.length).toBe(0);
    })
  })
})