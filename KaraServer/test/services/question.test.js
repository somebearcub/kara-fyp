const assert = require('assert');
const app = require('../../src/app');

describe('\'Question\' service', () => {
  it('registered the service', () => {
    const service = app.service('question');

    assert.ok(service, 'Registered the service');
  });
  it('deletes any existing questions on the database', async () => {
    let existingQuestions = await app.service('question').find();

    if (existingQuestions.total > 0) {
      existingQuestions.data.forEach(async item => {
        await app.service('question').remove(item.id);
      })
    }
  });

  it('saves a new question into the database', async () => {
    let question = await app.service('question').create({
      name: 'Are you OK?',
      question_component: 'YesNoQuestion',
      question_details: {
        buttons: [
          {name: 'Yes', value: 'yes'},
          {name: "No", value: 'no'},
        ],
      },
    });

    assert.ok(question);
  })

  it('retrieves question from database to display in app', async () => {
    let question = await app.service('question').find();

    console.log(question.data[0].question_details);

    assert.deepStrictEqual(question.data[0].question_details, {
      buttons: [
        {name: 'Yes', value: 'yes'},
        {name: 'No', value: 'no'},
      ],
    });
  })
});
