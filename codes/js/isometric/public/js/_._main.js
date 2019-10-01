var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'test', null, true, false);
var BasicGame = function(game) {};
BasicGame.Boot = function(game) {};

BasicGame.Boot.prototype =
{
	preload: function(){

	},
	create: function(){
        var a = ds.make.class({
            type: 'a',
            constructor: function(x){
                this.val = x;
            },
            mul: function(s){
                this.val *= s;
                return this;
            }
        });
        var b = ds.make.class({
                type:'b',
                inherits: a,
                constructor: function(x){
                    this.val = x;
                },
                sub: function(s){
                    this.val -= s;
                    return this;

                }
            });
    },
	update: function(){

	},
	render: function(){
	}
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');
