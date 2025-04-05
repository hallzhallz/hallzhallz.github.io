# A Simple Javascript Namespace Manager

Chris Pietschmann has a great article on a [simple namespace manager](http://pietschsoft.com/post/2007/07/10/Creating-Namespaces-in-JavaScript-is-actually-rather-simple.aspx). He states that if your using an AJAX framework you should obviously use the namespace management that it provides. However his code is perfect for my situation where I don’t have my AJAX framework loaded yet but do need my namespaces defined.

Anyway the reason for the post is that I refactored Chris’s code into a smaller recursive function:

```
/// Create the Namespace Manager that we'll use
///to make creating namespaces a little easier.
if (typeof Namespace == 'undefined') var Namespace = {};
if (!Namespace.Manager) Namespace.Manager = {};

Namespace.Manager = {
    Register: function(ns) {
        if (ns.length > 0) {
            myBaseNs = ns.substring(0, ns.lastIndexOf('.'));
            this.Register(myBaseNs);
            eval("if(!window." + ns + ") window." + ns + " ={};");            
        }
    }
};
```
