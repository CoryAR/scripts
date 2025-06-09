// Created by Cory and Nicket of jCodes: https://jcodesresources.com/

$(function() {
    let $body = $(document.body);

    function initStoredQueue(queueJson) {
        if (!queueJson) return [];
        let result = JSON.parse(queueJson);
        for (let item of result) {
            item.date = new Date(item.date);
            item.url = new URL(item.url);
        }
        return result;
    }

    function saveQueue() {
        localStorage.setItem("queue", JSON.stringify(queue));
        createScheduledTopicsTable();
        handleNextQueueItem();
    }

    let queue = initStoredQueue(localStorage.getItem("queue"));

    window.addEventListener("storage", (e) => {
        if (e.key === "queue") {
            queue = initStoredQueue(e.value);
            createScheduledTopicsTable();
            handleNextQueueItem();
        }
    });

    function cancelPopup() {
        $("input.cancel").click(function() {
            $(this).parent().parent().remove();
        });
    }

    function cancelConfirm() {
        $('#post-topic input.cancel, #scheduled-topics td.cancel a').click(function() {
            let $this = $(this);
            $body.append(
                '<div id="cancel-topic" class="tableborder queue-popup"><div class="row2">Are you sure you want to discard this topic?<br><br><input type="button" value="Yes" class="forminput cancel"> <input type="button" value="Cancel" class="forminput cancel"></div></div>'
            );

            $('#cancel-topic input[value="Yes"]').click(function() {
                $body.append(
                    '<div class="tableborder queue-popup"><div class="row2">Your topic has been discarded<br><br><input type="button" value="OK" class="forminput cancel"></div></div>'
                );
                let id = $this.parents('[data-id]').attr('data-id');
                queue = queue.filter(a => a.eid !== id);
                saveQueue();
                cancelPopup();
            });
            cancelPopup();
        });
    }

    if ($.inArray(queueGTitle, queueGroups.map(([title]) => title)) !== -1 && queueAct === "Post" && queueCODE === "00" || queueCODE === "01") {
        let limit = queueGroups.find(g => g[0] === queueGTitle)?.[1] ?? defaultLimit;

        $('input[name="preview"]').after('<input type="button" name="queue" value="Schedule Topic" class="forminput">');

        $('input[name="queue"]').click(function() {
            if (queue.length < limit) {
                $("#queue-topic").remove();

                $body.append(
                    '<div id="queue-topic" class="tableborder queue-popup"><div class="row2">Pick a date and time you would like to post this topic on:<br><br><input type="datetime-local" name="queue-date" class="forminput"><br><br><input type="button" name="queue-submit" value="Submit" class="forminput"> <input type="button" value="Cancel" class="forminput cancel"></div></div>'
                );

                $('input[name="queue-submit"]').click(function() {
                    if ($('input[name="TopicTitle"]').val() === "" || $('textarea[name="Post"]').val() === "") {
                        $body.append(
                            '<div class="tableborder queue-popup"><div class="row2">You must have a title and post to schedule a topic<br><br><input type="button" value="OK" class="forminput cancel"></div></div>'
                        );
                    } else if ($('input[name="queue-date"]').val() !== "") {
                        let date = new Date($('[name="queue-date"]')[0].value);
                        queue.push({
                            url: new URL(location.href),
                            fID: $('input[name="f"]').val(),
                            title: $('input[name="TopicTitle"]').val(),
                            description: $('input[name="TopicDesc"]').val(),
                            post: $('textarea[name="Post"]').val(),
                            enableEmoticons: $('input[name="enableemo"]').is(":checked"),
                            enableSignature: $('input[name="enablesig"]').is(":checked"),
                            enableNotifications: $('input[name="enabletrack"]').is(":checked"),
                            postIcon: $('input[name="iconid"]:checked').val(),
                            date,
                            eid: crypto.randomUUID()
                        });
                        queue.sort((a, b) => a.date - b.date);
                        saveQueue();
                        $body.append(
                            '<div class="tableborder queue-popup"><div class="row2">This topic will be posted on the date selected when you login<br><br><input type="button" value="OK" class="forminput cancel"></div></div>'
                        );
                        $("#queue-topic").remove();
                    } else {
                        $body.append(
                            '<div class="tableborder queue-popup"><div class="row2">You must select a valid date<br><br><input type="button" value="OK" class="forminput cancel"></div></div>'
                        );
                    }

                    cancelPopup();
                });
                cancelPopup();
            } else {
                $body.append(
                    `<div class="tableborder queue-popup"><div class="row2">You're only allowed to schedule up to ${limit} topics at once<br><br><input type="button" value="OK" class="forminput cancel"></div></div>`
                );
                cancelPopup();
            }
        });
    }

    function createScheduledTopicsTable() {
        $("#scheduled-topics").remove();

        $("table:has(td[width='20%'][nowrap]):eq(0)").before(
            '<div id="scheduled-topics" class="tableborder" style="display: none; margin: 10px 0"><div class="maintitle">Scheduled Topics</div><table style="width: 100%; text-align: center; border-spacing: 1px"><thead><th class="titlemedium">Title</th><th class="titlemedium">Date</th><th class="titlemedium">Cancel</th><th class="titlemedium">Edit</th></thead><tbody></tbody></div>'
        );

        $("#scheduled-topics-placeholder").append(
            '<div id="scheduled-topics" class="tableborder" style="display: none"><div class="pformstrip">Scheduled Topics</div><table style="width: 100%; text-align: center; border-spacing: 1px"><thead><th class="titlemedium">Title</th><th class="titlemedium">Date</th><th class="titlemedium">Cancel</th><th class="titlemedium">Edit</th></thead><tbody></tbody></div>'
        );

        queue.forEach(function(item, i) {
            $("#scheduled-topics tbody").append(
                '<tr data-id="' + queue[i].eid + '" class="f' +
                queue[i].fID +
                '" style="display: none"><td class="row2">' +
                queue[i].title +
                '</td><td class="row2">' +
                queue[i].date +
                '</td><td class="row2 cancel"><a href="javascript: void(0)">Cancel</a></td><td class="row2 edit-topic"><a href="/index.php?act=Post&CODE=00&f=' + queue[i].fID + '&edit=' + queue[i].eid + '">Edit</a></tr>'
            );

            cancelConfirm();
        });
    }

    let timer;

    function handleNextQueueItem() {
        clearTimeout(timer);
        if (!queue.length || $("#post-topic").length) return;
        const timeRemaining = queue[0].date - Date.now();
        if (timeRemaining > 0) {
            timer = setTimeout(handleNextQueueItem, timeRemaining);
            return;
        }

        let {
            title,
            description: desc,
            post,
            url,
            fID,
            enableEmoticons,
            enableSignature,
            enableNotifications,
            postIcon,
            date,
            eid
        } = queue[0];

        $body.append(
            '<div id="post-topic" data-id="' + eid + '" class="tableborder queue-popup"><div class="row2">Would you like to post the topic you have scheduled for today, "' +
            title +
            '"?<br><br><input type="button" value="Yes" class="forminput cancel"> <input type="button" value="Cancel" class="forminput cancel"></div></div>'
        );

        $('#post-topic input[value="Yes"]').click(function() {
            $.post(url, {
                st: "0",
                act: "Post",
                s: "",
                f: fID,
                auth_key: queueAuthKey,
                CODE: "01",
                TopicTitle: title,
                TopicDesc: desc,
                Post: post,
                enableemo: enableEmoticons,
                enablesig: enableSignature,
                enabletrack: enableNotifications,
                iconid: postIcon,
                success: function() {
                    $body.append(
                        '<div class="tableborder queue-popup"><div class="row2">Your topic has been posted<br><br><input type="button" value="OK" class="forminput cancel"></div></div>'
                    );
                    localStorage.removeItem("queue");
                    cancelPopup();
                }
            });
        });
        cancelConfirm();
        cancelPopup();
    }

    if (location.href.includes('&edit')) {
        $('#posting-form input[name="preview"]').insertAfter('#enter-your-post textarea').before('<br>').css('margin-top', '8px').click(function(e) {
            e.preventDefault();
            $.post("/index.php?", $(document.REPLIER).serialize() + "&preview=Preview", function(data) {
                $('#post_preview + br, #post_preview').remove();
                $('<div id="post_preview" class="tablefill">' + $('div.postcolor', data).html() + '<span id="close_preview" style="float: right; cursor: pointer" title="Close">X</span></div><br />').insertBefore('#enter-your-post textarea');

                $('#close_preview').click(function() {
                    $('#post_preview + br, #post_preview').remove();
                });
            });
        });

        $('input[name="queue"]').hide();
        $('input[value="Post New Topic"]').val('Save Topic');
        let url = new URL(location.href);
        let id = url.searchParams.get("edit");

        queue.forEach(function(item, i) {
            if (id === queue[i].eid) {
                $('[name="TopicTitle"]').val(queue[i].title);
                $('[name="TopicDesc"]').val(queue[i].description);
                $('textarea[name="Post"]').val(queue[i].post);
                $('[name="enableemo"]').prop('checked', queue[i].enableEmoticons);
                $('[name="enablesig"]').prop('checked', queue[i].enableSignature);
                $('[name="enabletrack"]').prop('checked', queue[i].enableNotifications);
                $('[name="iconid"][value="' + queue[i].postIcon + '"]').prop('checked', true);
            }
        });

        $('[value="Save Topic"]').click(function(e) {
            e.preventDefault();
            let itemToEdit = queue.find(a => a.eid === id);
            itemToEdit.title = $('input[name="TopicTitle"]').val();
            itemToEdit.description = $('input[name="TopicDesc"]').val();
            itemToEdit.post = $('textarea[name="Post"]').val();
            itemToEdit.enableEmoticons = $('input[name="enableemo"]').is(":checked");
            itemToEdit.enableSignature = $('input[name="enablesig"]').is(":checked");
            itemToEdit.enableNotifications = $('input[name="enabletrack"]').is(":checked");
            itemToEdit.postIcon = $('input[name="iconid"]:checked').val();
            saveQueue();

            $body.append(
                '<div class="tableborder queue-popup"><div class="row2">Your scheduled topic has been saved<br><br><input type="button" value="OK" class="forminput cancel"></div></div>'
            );

            cancelPopup();
        });
    }

    $('#ucpmenu a[href$="CODE=50"] + br').after(' &middot; <a href="/index.php?act=UserCP&CODE=26&scheduled">View Scheduled Topics</a>');

    if (location.href.includes('&scheduled')) {
        $('#ucpcontent *:not(div.maintitle)').hide();
        $('#ucpcontent').append('<div id="scheduled-topics-placeholder"></div>');
    }

    if (queue.length) {
        createScheduledTopicsTable();
        handleNextQueueItem();
    }

    if (location.href.includes('&scheduled') && $('#scheduled-topics-placeholder').html().length === 0) {
        $('#scheduled-topics-placeholder').append('<div style="text-align: center; font-style: italic; padding-top: 10px">You currently have no topics scheduled to be posted. You can schedule a topic from the compose topic page.</div>');
    }
});
