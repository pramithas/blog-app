package com.pramithas.controllers;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {

	@RequestMapping("/tasks")
	public List<String> getTasks() {
		List<String> taskList = new ArrayList<String>();
		taskList.add("Taks 1");
		taskList.add("Task 2");
		return taskList;
	}
}
