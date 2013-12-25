'use strict';

angular.module('seoToolApp')
.controller('MainCtrl', function ($scope,$sce) {
	$scope.inputHtml=''//$sce.trustAsHtml( '<textarea class="col-md-12" ></textarea>' );
	$scope.aTags=[]
	$scope.imgTags=[]
	$scope.metaTags=[]
	var workspace=$('#workspace')

	$scope.tmpCounter=0;

	$scope.output=''

	var tagNameToAttributes={
		'img':['src','alt'],
		'a':['href','title'],
		'meta':['content','name']
	}

	$scope.processHtml=function(inputHtml){
		var workspace=$('#workspace')
		workspace.html( $(inputHtml) );

		Object.keys(tagNameToAttributes).forEach(function(tagName){
			$scope[tagName+'Tags']=[]
			_getTags(tagName)
		})
		
	}

	function _getTags(tagName){
		var attributes
		, tmpTags=[]
		, workspace=$('#workspace');

		attributes=tagNameToAttributes[tagName]


		$(tagName,workspace).each(function(){
			var id=$scope.tmpCounter
			, $el=$(this);
			$scope.tmpCounter++;
			
			$el.attr('seo-tool-id',id);
			var tag={id:id}
			attributes.forEach(function(attrName){
				tag[attrName]=$el.attr(attrName)
			})
			tmpTags.push(tag)
		})
//		console.log(tmpTags);
		$scope[tagName+'Tags']=tmpTags
	}
	$scope.save=function(aTag,attr){
		var workspace=$('#workspace')
		$( '#'+aTag.id, workspace).attr(attr,aTag.title)
	}

	$scope.getOutput=function(){
		var workspace=$('#workspace')
		$('a,img',workspace).each(function(){
			$(this).removeAttr('seo-tool-id');
		})
		alert( workspace.html() );
	}

	

})
