import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', { path: '/' });
  this.route('register');
  this.route('about');
  this.route('clikur', function () {
    this.route('courses', function() {
      this.route('add');
    });
    this.route('course', { path: 'course/:course_id' }, function() {
      this.route('quiz', { path: 'quiz/:quiz_id' });
      this.route('quizzes', function() {
        this.route('add');
      });
    });
    this.route('lecture', { path: 'lecture/:course_id' });
  });
});

export default Router;
