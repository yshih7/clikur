import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('register');
  this.route('courses', function() {
    this.route('add');
  });
  this.route('course', { path: 'course/:course-id' }, function() {
    this.route('quiz', { path: 'quiz/:quiz-id' });
    this.route('quizzes', function() {
      this.route('add');
    });
  });
  this.route('lecture', { path: 'lecture/:course-id' });
});

export default Router;
